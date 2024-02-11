import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "../../models/User";
import { connect } from "../../../utils/mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        if (session.user && session.user.email) {
          await connect();
          const sessionUser = await User.findOne({ email: session.user.email });

          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        }
      } catch (error) {
        console.error("Error during session callback:", error);
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connect();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
