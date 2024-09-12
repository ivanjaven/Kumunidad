import { BlogTypedef } from '@/lib/typedef/blog-typedef'

export async function fetchBlogs(): Promise<BlogTypedef> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/blog/read/19'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BlogTypedef = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching filler data:', error)
    throw error
  }
}
