import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        // firstname: { type: "text" },
        // lastname: { type: "text" },
      },
      async authorize(credentials, request) {
        const response = await fetch(
          `${process.env.API_ENDPOINT}/users/signin`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            method: "POST",
            cache: "no-cache",
          }
        );
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
          throw jsonResponse;
        }

        return {
          id: jsonResponse.data.id,
          name: `${jsonResponse.data.firstname} ${jsonResponse.data.lastname}`,
          email: "",
        };
        // return {
        //   id: jsonResponse.data.id,
        //   name: `${jsonResponse.data.firstname} ${jsonResponse.data.lastname}`,
        //   email: "",
        // };
      },
    }),
  ],
} satisfies NextAuthOptions;
