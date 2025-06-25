'use client'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { logIn } from '@/lib/actions'
import SignInSocial from './sign-in-social'

const LoginForm = () => {
  const initialState = { message: '' }
  const [ state, formAction, pending ] = useActionState(logIn, initialState)

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
            <h1 className="mb-1 mt-16 text-xl font-semibold">Log In</h1>
            <p>Welcome back, log in to gain more access</p>
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

        <div className='flex flex-col'>
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account?
            <Button
              asChild
              variant="link"
              className="px-2">
                <Link href="/sign-up">Create account</Link>
            </Button>
          </p>

          <Button
            asChild
            variant="link"
            className="text-sm">
              <Link href="/login/account">Forgot your account?</Link>
          </Button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm