import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Make a fetch request to your API endpoint
        const response = await fetch("http://localhost:3000/api/user", {
          method: "POST", // or "GET", "PUT", etc. depending on your API
          headers: {
            "Content-Type": "application/json",
            // Add any required headers here
          },
          body: JSON.stringify({
            // Include any data you want to send to the API
            name: user.name,
            image: user.image,
            provider: account?.provider,
          }),
        });

        const data = await response.json();
        cookies().set("name", data.name);
        cookies().set("image", data.image);
        cookies().set("login", "true");

        // Optionally, you can handle the response here if needed
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors as needed
      }

      return true;
    },
  },
});
