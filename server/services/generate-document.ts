export async function generateDocument(requiredData: any): Promise<Blob> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/generate-document'

  try {
    console.log('Sending request to:', `${baseUrl}${endpoint}`)

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requiredData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response error:', response.status, errorText)
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      )
    }

    const blob = await response.blob()
    return blob
  } catch (error) {
    console.error('Error generating document:', error)
    throw error
  }
}
