import React, { useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserIcon, Camera, X } from 'lucide-react'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'
import { BlogTypedef } from '@/lib/typedef/blog-typedef'
import { useOfficialCard } from '@/lib/hooks/useOfficialCard'

interface OfficialCardProps {
  official: BlogTypedef
  index: number
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>> | null
}

export function OfficialCard({
  official,
  index,
  setOfficials,
}: OfficialCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { handleImageUpload, handleNameChange, removeOfficial } =
    useOfficialCard(setOfficials)

  return (
    <Card className="relative overflow-hidden">
      {BLOG_CONFIG.ADDITIONAL_ROLES.some(
        (role) => role.role === official.role,
      ) && (
        <button
          className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center bg-gray-100/80 hover:bg-gray-100"
          onClick={() => removeOfficial(official.role, index)}
        >
          <X size={16} />
        </button>
      )}
      <div
        className="relative h-48 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {official.image ? (
          <Image
            src={official.image}
            alt={official.name || official.role}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <UserIcon className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
          <Camera className="h-8 w-8" />
        </div>
      </div>
      <CardContent className="p-4">
        <Input
          placeholder={official.role}
          value={official.name}
          onChange={(e) =>
            handleNameChange(official.role, index, e.target.value)
          }
          className="mb-2"
        />
      </CardContent>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleImageUpload(official.role, index, e)}
      />
    </Card>
  )
}
