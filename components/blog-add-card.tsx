import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Role, BlogTypedef } from '@/lib/typedef/blog-typedef'

interface BlogAddCardProps {
  role: Role
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
}

export function BlogAddCard({ role, setOfficials }: BlogAddCardProps) {
  const addOfficial = () => {
    const newOfficial: BlogTypedef = { role, name: '', image: null }
    setOfficials((prev) => [...prev, newOfficial])
  }

  return (
    <Card
      className="flex h-full cursor-pointer items-center justify-center border border-dashed"
      onClick={addOfficial}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <PlusIcon className="mb-2 h-12 w-12 text-gray-400" />
        <p className="text-center text-sm text-gray-600">
          Add new {role.toLowerCase()}
        </p>
      </CardContent>
    </Card>
  )
}
