import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children }: Readonly<{children: React.ReactNode}> ) => {
  return (
    <div>
        <Button className="fixed top-5 left-5" variant={ 'outline' } asChild>
            <Link href='/'>
                <Icons.arrowLeft className='h-2 w-2'/>
                <p>Home</p>
            </Link>
        </Button>
        { children }
    </div>
  )
}

export default Layout