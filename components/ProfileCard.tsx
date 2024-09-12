'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Define the prop types for ProfileCard
interface ProfileCardProps {
  imageUrl: string
  role: string
  fullName: string
}

export function ProfileCard({ imageUrl, role, fullName }: ProfileCardProps) {
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 border-2 border-gray-200">
          <AvatarImage src={imageUrl} alt={fullName || 'Profile'} />
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
