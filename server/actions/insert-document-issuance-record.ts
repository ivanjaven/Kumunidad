import { DocumentIssuanceTypedef } from '@/lib/typedef/document-issuance-typedef'

export async function insertDocumentIssuanceRecord(
  data: DocumentIssuanceTypedef,
): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/docs/post'

  try {
    const requestBody = {
      document_title: data.document_title,
      resident_id: data.resident_id,
      required_fields: data.required_fields,
      issued_by: data.issued_by,
      price: data.price,
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
    console.error('Error posting document issuance data:', error)
    throw error
  }
}
