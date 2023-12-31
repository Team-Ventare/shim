import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// (api/auth/signin)
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            cart: {
              include: {
                products: true,
              },
            },
          },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
          role: user.role,
          cart: user.cart,
          cartId: user.cartId,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          cart: token.cart,
          cartId: token.cartId,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const us = await prisma.users.findUnique({
          where: {
            id: user.id,
          },
          include: {
            cart: {
              include: {
                products: true,
              },
            },
          },
        });

        if (!us) throw new Error("User not found");

        return {
          ...token,
          id: us.id,
          image: us.image,
          role: us.role,
          cart: us.cart,
          cartId: us.cartId,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
