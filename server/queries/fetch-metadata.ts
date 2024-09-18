import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'

export async function fetchMetadata(): Promise<MetadataTypedef> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/metadata'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: MetadataTypedef = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching filler data:', error)
    throw error
  }
}
