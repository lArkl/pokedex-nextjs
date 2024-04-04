import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./repository";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials.password) {
          throw Error("incomplete credentails");
        }
        const user = await getUser(credentials);
        return {
          id: user.id.toString(),
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        };
      },
    }),
  ],
} satisfies NextAuthOptions;
