import { encode, decode } from "next-auth/jwt";
import { env } from "~/env";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: {
    id: string;
    name: string;
    team: {
      id: string;
      name: string;
      logo: string;
    } | null;
  };
}

export const tokenOneDay = 24 * 60 * 60;
export const tokenOnWeek = tokenOneDay * 7;

const createJWT = (token: AuthUser, duration: number) =>
  encode({ token: token as any, secret: env.JWT_SECRET, maxAge: duration });

export const jwtHelper = {
  createAcessToken: (token: AuthUser) => createJWT(token, tokenOneDay),
  createRefreshToken: (token: AuthUser) => createJWT(token, tokenOnWeek),
  verifyToken: (token: string) => decode({ token, secret: env.JWT_SECRET }),
};
