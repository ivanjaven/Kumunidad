import { BlogTypedef } from '@/lib/typedef/blog-typedef'

export async function fetchBlogs(batchId: string): Promise<BlogTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = `/api/blog/read/${batchId}`

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BlogTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  } 
}