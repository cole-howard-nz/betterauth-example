import { createAuthClient } from 'better-auth/react'

export const { signIn, signOut, useSession, forgetPassword, resetPassword } = createAuthClient({
    baseURL: process.env.BASE_URL
})