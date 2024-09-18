import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { BlogTypedef } from '@/lib/typedef/blog-typedef'

interface BlogCardProps {
  blog: BlogTypedef
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-sm">
      <div className="h-48 bg-gray-100">
        {/* Use the image from the blog props or a placeholder if it's null */}
        {blog.image ? (
          <Image
            src={blog.image}
            alt={`${blog.name} thumbnail`}
            className="h-full w-full object-cover"
            width={384}
            height={192}
          />
        ) : (
          <Image
            src="/placeholder.svg?height=192&width=384"
            alt="Project thumbnail"
            className="h-full w-full object-cover"
            width={384}
            height={192}
          />
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          {/* Display the role and name from the blog props */}
          <p className="text-sm font-medium text-muted-foreground">
            {blog.role}
          </p>
          <h2 className="text-xl font-semibold tracking-tight">{blog.name}</h2>
        </div>
      </CardContent>
    </Card>
  )
}
