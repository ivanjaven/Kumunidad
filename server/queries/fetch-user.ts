import { UserInformationTypedef } from '@/lib/typedef/user-information-typedef'

export async function fetchUser(
  query: number,
): Promise<UserInformationTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = `/api/search/resident/id/${query}`

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    console.log(`fetching url: ${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: UserInformationTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching resident suggestions:', error)
    throw error
  }
}
