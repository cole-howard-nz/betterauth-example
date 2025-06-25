import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { db } from "../prisma"
import { nextCookies } from "better-auth/next-js"
import { sendEmail } from "../email"
 
export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite"
    }),
    emailAndPassword: {  
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        resetPasswordTokenExpiresIn: 3600, // 1 hour
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link in the body to reset your password: ${ url }`
            })
        }
    },
    account: {
        accountLinking: {
            enabled: true
        }
    },
    socialProviders: { 
        google: { 
           clientId: process.env.GOOGLE_CLIENT_ID as string, 
           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    // nextCookies must always be the last plugin in this array
    plugins: [nextCookies()] 
})