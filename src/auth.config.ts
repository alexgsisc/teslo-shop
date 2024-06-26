import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log(parsedCredentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        //search email
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null;

        // validate password
        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;

        //return user with no password
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
