'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
import { Check, Search, UserPlus } from 'lucide-react'
import { SearchSuggestionTypedef } from '@/lib/typedef/search-suggestion-typedef'
import { AccountTypedef } from '@/lib/typedef/account-typedef'
import { AccountDisplayTypedef } from '@/lib/typedef/account-display-typedef'
import { insertAccountRecord } from '@/server/actions/insert-account'
import { toast } from 'sonner'
import { hashPassword } from '@/lib/password-hash'
import { ProfileCardWithDelete } from '@/components/ProfileCard'
import { fetchSearchSuggestions } from '@/server/queries/fetch-search-suggestion'
import { fetchUsers } from '@/server/queries/fetch-users'

const Banner = () => (
  <div className="relative h-48 w-full bg-gray-100">
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-black">User Accounts</h1>
    </div>
  </div>
)

interface AddUserDialogProps {
  onUserAdded: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ onUserAdded }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: '',
    searchTerm: '',
    residentId: '',
  })
  const [suggestions, setSuggestions] = useState<SearchSuggestionTypedef[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [id]: value,
      ...(id === 'searchTerm' && value === '' ? { residentId: '', name: '' } : {})
    }))
    if (id === 'searchTerm') {
      setSelectedSuggestion(null)
    }
  }

  const fetchSuggestions = useCallback(async () => {
    if (formData.searchTerm.length < 2) {
      setSuggestions([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchSearchSuggestions(formData.searchTerm)
      setSuggestions(data)
    } catch (err) {
      console.error('Error fetching suggestions:', err)
      setError('Failed to load suggestions. Please try again.')
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [formData.searchTerm])

  useEffect(() => {
    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [formData.searchTerm, fetchSuggestions])

  const handleSave = async () => {
    const { role, residentId, username, password } = formData
    if (!role || !residentId || !username || !password) {
      toast.error('Please fill in all required fields, including selecting a valid resident.')
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

      await insertAccountRecord(accountData)
      toast.success('User account created successfully.')
      onUserAdded()
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
    setFormData({
      name: '',
      username: '',
      password: '',
      role: '',
      searchTerm: '',
      residentId: '',
    })
    setSelectedSuggestion(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800">
          <UserPlus className="mr-2 h-4 w-4" />
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
                id="searchTerm"
                placeholder="Search or enter a name"
                value={formData.searchTerm}
                onChange={handleInputChange}
                className="border-gray-300 pl-8"
              />
            </div>
            {formData.searchTerm.length >= 2 && (
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
                          setFormData((prev) => ({
                            ...prev,
                            name: suggestion.name,
                            searchTerm: suggestion.name,
                            residentId: suggestion.id.toString(),
                          }))
                          setSelectedSuggestion(suggestion.id.toString())
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
                        {selectedSuggestion === suggestion.id.toString() && (
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
              value={formData.username}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
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

const ProfileCardGrid = () => {
  const [profiles, setProfiles] = useState<AccountDisplayTypedef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProfiles = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    loadProfiles()
  }, [loadProfiles])

  const handleUserAdded = () => {
    loadProfiles()
  }

  return (
    <div className="bg-white">
      <Banner />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">User Directory</h2>
          <AddUserDialog onUserAdded={handleUserAdded} />
        </div>
        {isLoading ? (
          <p className="text-center">Loading profiles...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <ProfileCardWithDelete 
                key={profile.auth_id}
                id={profile.auth_id}
                imageUrl={profile.image_base64 || '/placeholder.svg?height=100&width=100'}
                role={profile.role}
                fullName={profile.full_name} onDelete={function (id: string | number): void {
                  throw new Error('Function not implemented.')
                } }              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCardGrid