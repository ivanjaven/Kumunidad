import { ProfileTypedef } from '@/lib/typedef/profile-typedef'

export async function fetchProfile(
  query: number,
): Promise<ProfileTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = `/api/resident/profile/id/${query}`

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    console.log(`fetching url: ${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ProfileTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching resident suggestions:', error)
    throw error
  }
}
