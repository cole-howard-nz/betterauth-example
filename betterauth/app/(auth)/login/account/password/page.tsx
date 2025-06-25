'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { forgetPassword } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const params = useSearchParams()
  const emailFromParams = params.get('email') || ''
  const [ email, setEmail ] = useState<string>(emailFromParams)
  const [ message, setMessage ] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await forgetPassword({
      email,
      redirectTo: `${ window.location.origin }/login/account/password/reset`
    })

    error ? setMessage("Something went wrong") : setMessage("Check your email for a reset link")
    setEmail('')
  }

  return (
    <div className='flex h-screen items-center'>
      <form
        onSubmit={ handleSubmit }
        className='p-6 max-w-md space-y-4 container mx-auto'>
          <h1 className='text-xl font-semibold'>
            Forgot password?
          </h1>
          <Input 
            required
            type='email'
            value={ email }
            placeholder='Your email'
            onChange={ e => setEmail(e.target.value) }
          />

          <div className='flex justify-between'>
            <Button className='w-48 cursor-pointer' type='submit'>Send Reset Link</Button>

            <Button className='w-48' asChild variant={ 'outline' }>
              <Link href='/login'>Sign In</Link>
            </Button>
          </div>

          { message && <p>{ message }</p> }
      </form>
    </div>
  )
}

export default Page