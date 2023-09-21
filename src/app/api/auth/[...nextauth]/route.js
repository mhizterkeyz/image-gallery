import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: "John Doe", email: "johndoe@email.com" };

        if (
          credentials.username?.toLocaleLowerCase() === "user@example.com" &&
          credentials.password === "1Password"
        ) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: null,
    error: null,
    verifyRequest: null,
    newUser: null,
  },
});

export { handler as GET, handler as POST };
