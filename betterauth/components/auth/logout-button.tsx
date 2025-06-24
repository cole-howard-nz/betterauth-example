'use client'
import React from 'react'
import { Icons } from '../icons'
import { signOut } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'

const LogoutButton = () => {
  const router = useRouter()
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        }
      }
    })
  }
  return (
    <div onClick={ handleClick }>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Icons.logOut />
          Logout
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  )
}

export default LogoutButton