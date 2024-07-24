import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Search, Bell } from 'lucide-react'

const option = [
  {
    title: 'Registration',
    description:
      'Guidelines and procedures for registering residents in the barangay.',
    image: '/1.webp',
  },
  {
    title: 'Document',
    description:
      'Instructions on obtaining and processing various barangay documents.',
    image: '/2.webp',
  },
  {
    title: 'Reports',
    description: 'Overview of barangay reports and how to generate them.',
    image: '/3.webp',
  },
  {
    title: 'Population Records',
    description:
      'Maintaining and updating the population records of the barangay.',
    date: 'January 2, 2023',
    image: '/4.webp',
  },
  {
    title: 'Barangay Details',
    description:
      'Comprehensive details about the barangay, including history and demographics.',
    image: '/1.webp',
  },
  {
    title: 'Create User',
    description: 'Steps to create a new user profile in the barangay system.',
    image: '/2.webp',
  },
]

export default function InformationManagementSystem() {
  return (
    <div className="min-h-screen text-black">
      <header className="border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/5.webp"
                alt="Logo"
                width={52}
                height={52}
                className="mr-4"
              />
              <h1 className="text-2xl font-bold">Barangay Management System</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-72 rounded-full border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                      src="/placeholder-user.jpg"
                      width={36}
                      height={36}
                      alt="Avatar"
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
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Access</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {option.map((res, index) => (
            <Card
              key={index}
              className="overflow-hidden border border-gray-300 transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={res.image}
                    alt={res.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                  {res.title}
                </CardTitle>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {res.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
