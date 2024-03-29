import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

// import { getUser, saveUser } from "@utils/backend";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account && user) {
                // profile's expiry is the idtoken's expiry
                // console.log("passing id token to token")
                token.id_token = account.id_token;
                token.accessToken = account.access_token
                token.user_id = profile.sub

            }
            return token;
        },
        async session({ session, user, token }) {
            // const theUser = await getUser(session.user.email)
            if (token) {
                // save stuff from token to session
                // console.log("passing id token to session")
                session.user.id = token.user_id
                session.id_token = token.id_token
            }
            //console.log(session)
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                // await saveUser(profile.name, profile.sub, profile.picture, profile.email)
                return true;
            } catch (error) {
                console.log(error)
                return false   
            }
        }
    }
})

export { handler as GET, handler as POST}