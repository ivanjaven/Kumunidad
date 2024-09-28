import React, { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { deleteUserAccount } from '@/server/actions/delete-user-account'

interface ProfileCardProps {
  id: string | number
  imageUrl: string
  role: string
  fullName: string
  onDelete: (id: string | number) => void
}

export function ProfileCardWithDelete({
  id,
  imageUrl,
  role,
  fullName,
  onDelete,
}: ProfileCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [confirmName, setConfirmName] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const avatarSrc = imageError
    ? '/placeholder.svg?height=100&width=100'
    : imageUrl

  const isAdmin = role.toLowerCase() === 'admin'

  const handleDelete = async () => {
    if (confirmName.trim().toLowerCase() !== fullName.trim().toLowerCase()) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteUserAccount(id)
      setIsOpen(false)
      onDelete(id) // Call the onDelete callback to update the parent component
    } catch (error) {
      console.error('Error deleting account:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleConfirmNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmName(e.target.value)
    },
    [],
  )

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setConfirmName('')
    }
  }, [])

  if (!id) {
    return null // Don't render the card if there's no id
  }

  return (
    <Card className="w-full overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <CardContent className="flex items-center p-4 sm:p-6">
        <Avatar className="mr-4 h-12 w-12 ring-2 ring-gray-100 sm:mr-6 sm:h-16 sm:w-16">
          <AvatarImage
            src={avatarSrc}
            alt={fullName || 'Profile'}
            onError={handleImageError}
          />
          <AvatarFallback className="bg-gray-50 text-sm font-medium text-gray-600 sm:text-base">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h3 className="mb-0.5 text-base font-semibold text-gray-900 sm:text-lg">
            {fullName || 'Unknown'}
          </h3>
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            {role || 'Role not specified'}
          </p>
        </div>
        {!isAdmin && (
          <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Delete account"
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="mx-auto max-w-md rounded-lg bg-white p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-2 text-xl font-semibold text-gray-900">
                  Confirm Account Deletion
                </AlertDialogTitle>
                <AlertDialogDescription className="mb-4 text-sm text-gray-600">
                  You are about to permanently delete {fullName} account. This
                  action cannot be undone and will remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="mb-4">
                <Label
                  htmlFor="confirm-name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  To confirm, please type: {fullName}
                </Label>
                <Input
                  id="confirm-name"
                  value={confirmName}
                  onChange={handleConfirmNameChange}
                  className="rounded-md border border-gray-300 text-sm text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  autoComplete="off"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 transition-colors duration-200 hover:bg-gray-50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={
                    isDeleting ||
                    confirmName.trim().toLowerCase() !==
                      fullName.trim().toLowerCase()
                  }
                  className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardContent>
    </Card>
  )
}
