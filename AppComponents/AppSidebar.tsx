"use client"

import { Users, UserPlus, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Add Employee",
    url: "/employees/add",
    icon: UserPlus,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="grid flex-1 text-center">
            <span className="truncate text-lg font-bold text-orange-600">Employee</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col items-center">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md cursor-pointer w-full
                        ${isActive ? "bg-orange-100 text-orange-600 font-semibold" : "text-gray-700"}
                        hover:bg-orange-50 hover:text-orange-500`}
                    >
                      <Link href={item.url} className="flex items-center space-x-2">
                        <item.icon className={isActive ? "text-orange-600" : "text-gray-500"} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
