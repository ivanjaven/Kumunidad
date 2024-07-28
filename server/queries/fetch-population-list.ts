import { PopulationTypedef } from '@/lib/typedef/population-typedef'

export async function fetchPopulationList(): Promise<PopulationTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/population/list'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PopulationTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching population list:', error)
    throw error
  }
}
