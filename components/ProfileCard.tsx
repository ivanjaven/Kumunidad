import React, { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { deleteUserAccount } from '@/server/actions/delete-user-account'

interface ProfileCardProps {
  id: string | number;
  imageUrl: string;
  role: string;
  fullName: string;
  onDelete: (id: string | number) => void;
}

export function ProfileCardWithDelete({ id, imageUrl, role, fullName, onDelete }: ProfileCardProps) {
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

  const avatarSrc = imageError ? '/placeholder.svg?height=100&width=100' : imageUrl

  const isAdmin = role.toLowerCase() === 'admin'

  const handleDelete = async () => {
    if (confirmName.trim().toLowerCase() !== fullName.trim().toLowerCase()) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteUserAccount(id)
      setIsOpen(false)
      onDelete(id)
    } catch (error) {
      console.error('Error deleting account:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleConfirmNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmName(e.target.value)
  }, [])

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
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardContent className="p-4 sm:p-6 flex items-center">
        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mr-4 sm:mr-6 ring-2 ring-gray-100">
          <AvatarImage 
            src={avatarSrc} 
            alt={fullName || 'Profile'} 
            onError={handleImageError}
          />
          <AvatarFallback className="bg-gray-50 text-gray-600 text-sm sm:text-base font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-0.5">
            {fullName || 'Unknown'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">{role || 'Role not specified'}</p>
        </div>
        {!isAdmin && (
          <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1.5"
                aria-label="Delete account"
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white p-6 max-w-md mx-auto rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirm Account Deletion</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 text-sm mb-4">
                  You are about to permanently delete {fullName} account. This action cannot be undone and will remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="mb-4">
                <Label htmlFor="confirm-name" className="text-sm font-medium text-gray-700 mb-1 block">
                  To confirm, please type: {fullName} 
                </Label>
                <Input
                  id="confirm-name"
                  value={confirmName}
                  onChange={handleConfirmNameChange}
                  className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  autoComplete="off"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-gray-500 bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-sm px-4 py-2 mr-2 transition-colors duration-200">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting || confirmName.trim().toLowerCase() !== fullName.trim().toLowerCase()}
                  className="bg-red-600 text-white hover:bg-red-700 rounded-md text-sm px-4 py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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