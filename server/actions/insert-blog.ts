import { BlogStateTypedef } from '@/lib/typedef/blog-state-typedef'

export async function createBlog(data: BlogStateTypedef): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/blog/create'

  try {
    const requestBody = {
      executiveOfficials: data.stateForBarangayExecutiveOfficials,
      stateForBarangaykagawads: data.stateForBarangaykagawads,
      stateForBarangayLupongTagapamayapa:
        data.stateForBarangayLupongTagapamayapa,
      stateForSKExecutiveOfficials: data.stateForSKExecutiveOfficials,
      stateForSKkagawads: data.stateForSKkagawads,
      stateForBarangayTanod: data.stateForBarangayTanod,
      stateForStartingYear: data.stateForStartingYear,
      stateForEndingYear: data.stateForEndingYear,
      stateForTermsAndConditionsAccepted:
        data.stateForTermsAndConditionsAccepted,
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error posting blog data:', error)
    throw error
  }
}
