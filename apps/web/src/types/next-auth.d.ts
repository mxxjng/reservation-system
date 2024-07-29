import { type DefaultSession } from "next-auth";

// TODO: extend default session to include user role for a session
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user?: {
//       id: string;
//       username: string;
//       role: {
//         id: string;
//         type: string;
//         team: string | null;
//       };
//     } & DefaultSession["user"];
//   }
// }
