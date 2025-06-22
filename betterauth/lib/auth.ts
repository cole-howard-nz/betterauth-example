import { betterAuth } from "better-auth"

import { prismaAdapter } from "better-auth/adapters/prisma"
import { db } from "./prisma"
 
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
})