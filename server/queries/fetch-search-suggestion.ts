import { SearchSuggestionTypedef } from '@/lib/typedef/search-suggestion-typedef'

export async function fetchSearchSuggestions(
  query: string,
): Promise<SearchSuggestionTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = `/api/search/resident/name/${query}`

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: SearchSuggestionTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching resident suggestions:', error)
    throw error
  }
}
