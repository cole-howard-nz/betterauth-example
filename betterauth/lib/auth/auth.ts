import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { db } from "../prisma"
import { nextCookies } from "better-auth/next-js"
 
export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite"
    }),
    emailAndPassword: {  
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
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