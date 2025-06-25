import React from 'react'
import { Button } from '../ui/button'
import { signIn } from '@/lib/auth/auth-client'

const SignInSocial = ({ provider, children }:{ provider: string, children: React.ReactNode }) => {
  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: '/dashboard'
    })
  }

  return (
    <Button
      type='button'
      onClick={ handleClick }
      variant={ 'outline' }
      className='flex-1 cursor-pointer'>
        { children }
    </Button>
  )
}

export default SignInSocial