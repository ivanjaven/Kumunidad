'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Define the prop types for ProfileCard
interface ProfileCardProps {
  id: string | number;  // Added id prop
  imageUrl: string;
  role: string;
  fullName: string;
}

export function ProfileCard({ id, imageUrl, role, fullName }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false)

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  const handleImageError = () => {
    setImageError(true)
  }

  const avatarSrc = imageError ? '/placeholder.svg?height=100&width=100' : imageUrl

  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 border-2 border-gray-200">
          <AvatarImage 
            src={avatarSrc} 
            alt={fullName || 'Profile'} 
            onError={handleImageError}
          />
          <AvatarFallback className="bg-gray-100 text-gray-600">
            {initials}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="mb-2 text-lg font-semibold">
          {fullName || 'Unknown'}
        </CardTitle>
        <p className="text-sm text-gray-600">{role || 'Role not specified'}</p>
      </CardContent>
    </Card>
  )
}