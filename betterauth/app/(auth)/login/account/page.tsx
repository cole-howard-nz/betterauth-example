'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findAccount } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const [ email, setEmail ] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = await findAccount(email)

    if (!found) {
      router.push('/sign-up')
      return
    }

    router.push(`/login/account/password?email=${ encodeURIComponent(email) }`)
  }

  return (
    <div className='flex h-screen items-center'>
      <form
        onSubmit={ handleSubmit }
        className='p-6 max-w-md space-y-4 container mx-auto'>
          <h1 className='text-xl font-semibold'>
            Find your account
          </h1>
          <Input 
            required
            type='email'
            value={ email }
            onChange={ e => setEmail(e.target.value) }
          />
          <Button type='submit'>Search</Button>
      </form>
    </div>
  )
}

export default Page