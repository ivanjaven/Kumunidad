import { AccountDisplayTypedef } from '@/lib/typedef/account-display-typedef'

export async function fetchUsers(): Promise<AccountDisplayTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/account/read'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: AccountDisplayTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
