import { ActivityLogsTypedef } from '@/lib/typedef/activity-logs-typedef'

export async function fetchActivityLogs(
  page: number = 1,
  limit: number = 25,
): Promise<{ data: ActivityLogsTypedef[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/logs/activity'

  try {
    const response = await fetch(
      `${baseUrl}${endpoint}?page=${page}&limit=${limit}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    throw error
  }
}
