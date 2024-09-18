import { BatchTypedef } from '@/lib/typedef/batch-typedef'

export async function fetchBatches(): Promise<BatchTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/blog/list'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BatchTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching batches:', error)
    throw error
  }
}
