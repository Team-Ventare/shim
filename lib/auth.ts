import { getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
    session.user.id = token.id;
    session.user.name = token.name;
    return session;
};

export const getUserSession = async () => {
    const authUserSession = await getServerSession({
        callbacks: {
            session
        }
    });

    if (!authUserSession) return null;
    return authUserSession.user;
}