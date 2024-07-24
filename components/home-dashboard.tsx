'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Search, Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuickAccessTypedef } from '@/lib/typedef/quick-access-typedef'
import { BarangayConfig } from '@/lib/config/BARANGAY_CONFIG'

// HomeDashboard Component definition
export function HomeDashboard() {
  const { defaultSettings, userRoles } = BarangayConfig

  // Define userRole state with type
  const [userRole, setUserRole] = useState<keyof typeof userRoles>('admin')

  // Accessing quickAccessFeatures with correct type
  const quickAccessFeatures = userRoles[userRole].quickAccessFeatures

  return (
    <div className="min-h-screen text-black">
      {/* Header section */}
      <header className="border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center">
              <Image
                src={defaultSettings.logoUrl}
                alt={`${defaultSettings.name} Barangay Logo`}
                width={52}
                height={52}
                className="mr-4"
              />
              <h1 className="text-2xl font-bold">{defaultSettings.name}</h1>
            </div>
            <nav className="flex items-center space-x-6">
              {/* Search Input */}
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-72 rounded-full border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
              </div>
              {/* Notification Button */}
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </Button>
              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                      src="/placeholder.svg"
                      width={36}
                      height={36}
                      alt="User Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Access</h2>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickAccessFeatures.map(
            (feature: QuickAccessTypedef, index: number) => (
              <Link href={feature.linkUrl} key={index}>
                <Card className="overflow-hidden border border-gray-300 transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={feature.imageUrl}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ),
          )}
        </section>
      </main>
    </div>
  )
}
