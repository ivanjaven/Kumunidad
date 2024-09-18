'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Check, Search } from 'lucide-react'
import { SearchSuggestionTypedef } from '@/lib/typedef/search-suggestion-typedef'
import { AccountTypedef } from '@/lib/typedef/account-typedef'
import { AccountDisplayTypedef } from '@/lib/typedef/account-display-typedef'
import { insertAccountRecord } from '@/server/actions/insert-account'
import { toast } from 'sonner'
import { hashPassword } from '@/lib/password-hash'
import { ProfileCard } from '@/components/ProfileCard'

// Import the fetchSearchSuggestions function
import { fetchSearchSuggestions } from '@/server/queries/fetch-search-suggestion'

// Import the fetchUsers function
import { fetchUsers } from '@/server/queries/fetch-users'

function Banner() {
  return (
    <div className="relative h-48 w-full overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">User Accounts</h1>
      </div>
    </div>
  )
}

function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestionTypedef[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [residentId, setResidentId] = useState('')

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([])
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchSearchSuggestions(searchTerm)
        setSuggestions(data)
      } catch (err) {
        console.error('Error fetching suggestions:', err)
        setError('Failed to load suggestions. Please try again.')
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const handleSave = async () => {
    if (!role || !residentId || !username || !password) {
      toast.error('Please fill in all fields.')
      return
    }

    try {
      const hashedPassword = await hashPassword(password)

      const accountData: AccountTypedef = {
        role,
        resident_id: residentId,
        username,
        password: hashedPassword,
      }

      const result = await insertAccountRecord(accountData)
      toast.success('User account created successfully.')
      setOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error creating user account:', error)
      toast.error('Failed to create user account. Please try again.', {
        action: {
          label: 'Try again',
          onClick: () => handleSave(),
        },
      })
    }
  }

  const resetForm = () => {
    setName('')
    setUsername('')
    setPassword('')
    setRole('')
    setSearchTerm('')
    setResidentId('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800">
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Add New User
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                placeholder="Search or enter a name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300 pl-8"
              />
            </div>
            {searchTerm.length >= 2 && (
              <Command className="rounded-lg border border-gray-200 shadow-sm">
                <CommandEmpty>No name found.</CommandEmpty>
                <CommandGroup>
                  {isLoading ? (
                    <CommandItem>Loading suggestions...</CommandItem>
                  ) : error ? (
                    <CommandItem>{error}</CommandItem>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.id}
                        onSelect={() => {
                          setName(suggestion.name)
                          setSearchTerm(suggestion.name)
                          setResidentId(suggestion.id.toString())
                        }}
                        className="flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={suggestion.image}
                            alt={suggestion.name}
                          />
                          <AvatarFallback>
                            {suggestion.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{suggestion.name}</span>
                        {name === suggestion.name && (
                          <Check className="ml-auto h-4 w-4 text-green-500" />
                        )}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem>No suggestions available</CommandItem>
                  )}
                </CommandGroup>
              </Command>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="secretary">Secretary</SelectItem>
                <SelectItem value="treasurer">Treasurer</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-black text-white hover:bg-gray-800"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ProfileCardGrid() {
  const [profiles, setProfiles] = useState<AccountDisplayTypedef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfiles() {
      try {
        setIsLoading(true)
        const data = await fetchUsers()
        setProfiles(data)
      } catch (err) {
        console.error('Error fetching profiles:', err)
        setError('Failed to load profiles. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfiles()
  }, [])

  return (
    <div className="relative">
      <Banner />
      <div className="container mx-auto px-4 relative">
        <div className="absolute right-4 -top-12">
          <AddUserDialog />
        </div>
        {isLoading ? (
          <p className="mt-8 text-center">Loading profiles...</p>
        ) : error ? (
          <p className="mt-8 text-center text-red-500">{error}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <ProfileCard 
                key={profile.auth_id} 
                id={profile.auth_id}
                imageUrl={profile.image_base64 || '/placeholder.svg?height=100&width=100'}
                role={profile.role}
                fullName={profile.full_name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}