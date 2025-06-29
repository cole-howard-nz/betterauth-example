"use server"

import { redirect } from "next/navigation"
import { auth } from "./auth/auth"
import { APIError } from "better-auth/api"
import { db } from "./prisma"

interface State {
    message?: string | null 
}

export const signUp = async (prevState: State, formData: FormData) => {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const { email, password } = data
    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name: email.split('@')[0]
        }
      })
    } catch (error) {
      if (error instanceof APIError) {
        switch (error.status) {
          case "UNPROCESSABLE_ENTITY":
            return { message: "User already exists" }
          case "BAD_REQUEST":
            return { message: "Invalid email" }
          default:
            return { message: "Something went wrong" }
        }
      }
      console.error("Sign-up failed", error)
    }
    redirect('/dashboard')
}

export const logIn = async (prevState: State, formData: FormData) => {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { email, password } = data
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { message: "User not found" }
        case "BAD_REQUEST":
          return { message: "Invalid email" }
        default:
          return { message: "Something went wrong" }
      }
    }
    console.error("Login failed", error)
  }
  redirect('/dashboard')
}

export const findAccount = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email }
  })

  return user
}