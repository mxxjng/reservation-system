import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";
import { loginSchema } from "~/types/auth";

import * as schema from "./db/schema";
import { eq } from "drizzle-orm";
import { jwtHelper, tokenOnWeek, tokenOneDay } from "~/utils/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      username: string;
      role: {
        id: string;
        type: string;
        team: {
          id: string;
          name: string;
          logo: string | null;
        } | null;
      };
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "admin-credentials",
      id: "admin-credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // NOTE: function not implemented correctly yet
        try {
          const parsedCredentials = await loginSchema.parseAsync(credentials);

          const user = await db.query.users.findFirst({
            where: eq(schema.users.email, parsedCredentials.email),
          });

          if (!user) {
            return null;
          }

          const userRoles = await db.query.userRoles.findFirst({
            where: eq(schema.userRoles.userId, user?.id),
            with: {
              role: {
                columns: {
                  id: true,
                  type: true,
                },
              },
              team: {
                columns: {
                  id: true,
                  name: true,
                  logo: true,
                },
              },
            },
          });

          if (!userRoles) {
            return null;
          }

          // TODO: enable bcrypt validation again for production

          // const isValidPassword = bcrypt.compareSync(
          //   parsedCredentials.password,
          //   user.password
          // );

          // if (!isValidPassword) {
          //   console.log("invalid password");
          //   return null;
          // }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            role: {
              ...userRoles.role,
              team: userRoles.team || null,
            },
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      console.log("user", user);
      console.log("token", token);

      // TODO: refactor this code
      // credentials provider:  Save the access token and refresh token in the JWT on the initial login
      if (user) {
        const authUser = {
          id: user.id,
          email: user.email as string,
          name: user.name,
          username: user.username,
          role: user.role,
        };

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() / 1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() / 1000 + tokenOnWeek;

        return {
          ...token,
          accessToken,
          refreshToken,
          accessTokenExpired,
          refreshTokenExpired,
          user: authUser,
        };
      } else {
        if (token) {
          // If the access token has expired, try to refresh it
          if (Date.now() / 1000 > token.accessTokenExpired) {
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken) {
              const user = await db.query.users.findFirst({
                where: eq(schema.users.email, token.user.email),
              });

              if (user) {
                const accessToken = await jwtHelper.createAcessToken(token.user);
                const accessTokenExpired = Date.now() / 1000 + tokenOneDay;

                return { ...token, accessToken, accessTokenExpired };
              }
            }

            return { ...token, error: "RefreshAccessTokenError" };
          }
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = {
          email: token.user.email,
          name: token.user.name,
          id: token.user.id,
          username: token.user.username,
          role: token.user.role,
        };
      }
      session.error = token.error;
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
