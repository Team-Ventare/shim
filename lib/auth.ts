import { getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  session.user.name = token.name;
  session.user.email = token.email;
  session.user.role = token.role;
  session.user.cartId = token.cartId;
  return session;
};

export const getUserSession = async () => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });

  if (!authUserSession) throw new Error("User not found");
  return authUserSession.user;
};
