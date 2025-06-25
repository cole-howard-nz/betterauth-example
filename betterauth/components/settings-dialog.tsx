"use client"

import * as React from "react"
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import LogoutButton from "./auth/logout-button"
import { NavUser } from "./ui/nav-user"

const data = {
  nav: [
    { name: "Home", icon: Home },
    { name: "Change Content", icon: MessageCircle },
    { name: "Privacy and Visibility", icon: Lock },
    { name: "Admin Settings", icon: Settings },
  ],
}

export function SettingsDialog({ user }:{ user: {
  name: string,
  email: string,
  image?: string | null | undefined
}}) {
  const [open, setOpen] = React.useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <div className="flex h-full flex-col">
                      <div className="pb-2 border-b mb-4 space-y-2">
                        <NavUser user={ user } />
                      </div>

                      <div className="flex-1 space-y-1">
                        {data.nav.map((item) => (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.name === "Home"}
                            >
                              <a href="#">
                                <item.icon />
                                <span>{item.name}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </div>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
