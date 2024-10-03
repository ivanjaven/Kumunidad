'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
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
import { SearchSuggestionTypedef } from '@/lib/typedef/search-suggestion-typedef'
import { fetchSearchSuggestions } from '@/server/queries/fetch-search-suggestion'

const SearchSuggestion = ({ 
  resident,
  onClick,
}: {
  resident: SearchSuggestionTypedef;
  onClick: (id: number) => void;
}) => (
  <div 
    className="flex items-center space-x-4 p-3 hover:bg-gray-100 cursor-pointer"
    onClick={() => onClick(resident.id)}
  >
    <Image
      src={resident.image}
      alt={resident.name}
      width={40}
      height={40}
      className="rounded-full border border-gray-600"
    />
    <span className="text-sm font-medium text-black">{resident.name}</span>
  </div>
)

export default function HomeDashboard() {
  const { defaultSettings, userRoles } = BarangayConfig
  const [userRole, setUserRole] = useState<keyof typeof userRoles | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestionTypedef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function validateSession() {
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'GET',
          credentials: 'include', // This is important to include cookies in the request
        })

        if (!response.ok) {
          throw new Error('Authentication failed')
        }

        const data = await response.json()

        if (data.authenticated && userRoles.hasOwnProperty(data.role)) {
          setUserRole(data.role)
        } else {
          throw new Error('Invalid user role')
        }
      } catch (error) {
        console.error('Session validation error:', error)
        router.push('/log-in')
      } finally {
        setIsLoading(false)
      }
    }

    validateSession()
  }, [router, userRoles])

  // Fetch search suggestions with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const results = await fetchSearchSuggestions(searchQuery)
          setSuggestions(results)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const handleSuggestionClick = (id: number) => {
    router.push(`/profile/id/${id}`)
    setSearchQuery('')
    setSuggestions([])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (userRole === null) {
    return null // or a login prompt
  }

  const quickAccessFeatures = userRoles[userRole]?.quickAccessFeatures || []

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
                  placeholder="Search residents..."
                  className="w-72 rounded-full border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
                {suggestions.length > 0 && (
                  <div className="absolute z-10 mt-3 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                    {suggestions.map((resident) => (
                      <SearchSuggestion 
                        key={resident.id} 
                        resident={resident} 
                        onClick={handleSuggestionClick}
                      />
                    ))}
                  </div>
                )}
              </div>
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
                  <DropdownMenuLabel>My Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/activity-logs">
                    <DropdownMenuItem>Activity Logs</DropdownMenuItem>
                  </Link>
                  <Link href="/profile-account">
                    <DropdownMenuItem>Profile Account</DropdownMenuItem>
                  </Link>
                  <Link href="/legal-privacy">
                    <DropdownMenuItem>Legal & Privacy</DropdownMenuItem>
                  </Link>
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
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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