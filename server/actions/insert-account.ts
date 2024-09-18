import { AccountTypedef } from '@/lib/typedef/account-typedef'

export async function insertAccountRecord(data: AccountTypedef): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/account/add'

  try {
    const requestBody = {
      role: data.role,
      resident_id: data.resident_id,
      username: data.username,
      password: data.password,
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response error:', response.status, errorText)
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      )
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error posting account data:', error)
    throw error
  }
}
