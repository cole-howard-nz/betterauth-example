'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/lib/auth/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const [ password, setPassword ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  useEffect( () => {
    if (!token) {
      setMessage("Invalid or missing token")
    }
  }, [token])

  const handleSubmit = async () => {
    if (!token) {
      return
    } 

    const { error } = await resetPassword({
      token: token,
      newPassword: password,
    })

    if (error) {
      setMessage('Failed to reset password')
    } else {
      setMessage('Password reset successfully. You can now sign in')
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  return (
    <div className='flex h-screen items-center'>
      <form
        onSubmit={ handleSubmit }
        className='p-6 max-w-md space-y-4 container mx-auto'>
          <h1 className='text-xl font-semibold'>
            Reset Password
          </h1>

          { message && <p>{ message }</p> }

          <Input 
            required
            type='password'
            value={ password }
            placeholder='New password'
            onChange={ e => setPassword(e.target.value) }
            className='w-full border p-2'
          />

          <Button className='cursor-pointer' type='submit'>Reset Password</Button>
      </form>
    </div>
  )
}

export default Page