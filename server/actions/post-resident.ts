import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'

export async function postRegistration(
  data: RegistrationTypedef,
): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/resident/registration/post'

  try {
    const requestBody = {
      full_name: `${data.name} ${data.middleName} ${data.surname}`,
      first_name: data.name,
      last_name: data.surname,
      middle_name: data.middleName || 'N/A',
      gender: data.gender,
      image_base64: data.image_base64,
      fingerprint_base64: 'base64encodedfingerprint',
      date_of_birth: `${data.year}-${data.month}-${data.day}`,
      civil_status: data.status,
      barangay_status: 'In',
      house_number: data.houseNumber,
      street_id: data.street,
      barangay_id: '1',
      municipality_id: '1',
      province_id: '1',
      postal_code: '3017',
      email: data.email || 'N/A',
      phone: data.phone || 'N/A',
      occupation_id: data.occupation,
      nationality_id: data.nationality,
      religion_id: data.religion,
      benefit_id: data.benefits,
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
    console.error('Error posting registration data:', error)
    throw error
  }
}
