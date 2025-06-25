'use client'
import { signUp } from '@/lib/actions'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import SignInSocial from './sign-in-social'

const SignUpForm = () => {
  const initialState = { message: '' }
  const [ state, formAction, pending ] = useActionState(signUp, initialState)

  useEffect(() => {
    if (state.message.length) {
      toast.error(state.message)
    }
  }, [state.message])

  return (
  <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
          action={ formAction }
          className="max-w-92 m-auto h-fit w-full">
          <div className="p-6">
              <div>
                  <Link
                      href="/"
                      aria-label="go home">
                      <Icons.logo />
                  </Link>
                  <h1 className="mb-1 mt-16 text-xl font-semibold">Create an Account</h1>
                  <p>Welcome! Create an account to get started</p>
              </div>

              <div className="flex justify-between items-center gap-3 mt-6">
                <SignInSocial provider='google'>
                    <Icons.google />
                    <span>Google</span>
                </SignInSocial>

                <SignInSocial provider='microsoft'>
                    <Icons.microsoft />
                    <span>Microsoft</span>
                </SignInSocial>
            </div>

              <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <hr className="border-dashed" />
                  <span className="text-muted-foreground text-xs">Or continue with</span>
                  <hr className="border-dashed" />
              </div>

              <div className="space-y-6">
                  <div className="space-y-2">
                      <Label
                          htmlFor="email"
                          className="block text-sm">
                          Email
                      </Label>
                      <Input
                          type="email"
                          required
                          name="email"
                          id="email"
                      />
                  </div>
                  <div className="space-y-2">
                      <Label
                          htmlFor="password"
                          className="block text-sm">
                          Password
                      </Label>
                      <Input
                          type="password"
                          required
                          name="password"
                          id="password"
                      />
                  </div>
                  <Button className="w-full" disabled={ pending }>Continue</Button>
              </div>
            </div>

            <p className="text-accent-foreground text-center text-sm">
                Have an account?
                <Button
                    asChild
                    variant="link"
                    className="px-2">
                    <Link href="/login">Log In</Link>
                </Button>
            </p>
        </form>
    </section>
  )
}

export default SignUpForm