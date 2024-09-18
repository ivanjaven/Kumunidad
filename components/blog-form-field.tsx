import { useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserIcon, Camera } from 'lucide-react'
import { BlogTypedef } from '@/lib/typedef/blog-typedef'

interface OfficialCardProps {
  official: BlogTypedef
  index: number
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
}

export function BlogFormField({
  official,
  index,
  setOfficials,
}: OfficialCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setOfficials((prev) =>
          prev.map((off, i) =>
            i === index ? { ...off, image: e.target?.result as string } : off,
          ),
        )
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfficials((prev) =>
      prev.map((off, i) =>
        i === index ? { ...off, name: event.target.value } : off,
      ),
    )
  }

  return (
    <Card className="relative overflow-hidden">
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
          onChange={handleNameChange}
          className="mb-2"
        />
      </CardContent>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </Card>
  )
}
