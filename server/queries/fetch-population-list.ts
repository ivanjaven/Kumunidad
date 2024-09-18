interface PopulationTypedef {
  id: number
  name: string
  gender: string
  age: number
  age_category: string
  status: string
  street: string
  occupation: string
}

export async function fetchPopulationList(): Promise<PopulationTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/population/records'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PopulationTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching population records:', error)
    throw error
  }
}
