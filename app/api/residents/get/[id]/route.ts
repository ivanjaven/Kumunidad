import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

type QueryParams = {
  query: string
  values: (string | number | boolean | null)[]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    APILogger(request, params)

    const { id } = params
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    console.log('Fetching user with ID:', id)

    const user = await Query({
      query: ` 
      SELECT 
        residents.resident_id,
        residents.full_name,
        residents.first_name,
        residents.last_name,
        residents.middle_name,
        residents.gender,
        residents.date_of_birth,
        residents.civil_status,
        residents.image_base64,
        residents.address_id,
        residents.contact_id,
        residents.occupation_id,
        residents.nationality_id,
        residents.religion_id,
        residents.benefit_id,
        addresses.house_number_id,
        addresses.street_id,
        addresses.barangay_id,
        addresses.municipality_id,
        addresses.province_id,
        contacts.email,
        contacts.mobile,
        religions.religion_name,
        occupations.occupation_name,
        nationalities.nationality_name,
        benefits.benefit_name,
        hn1.house_number AS house_number,
        streets.street_name,
        barangays.barangay_name

      FROM residents

      LEFT JOIN addresses ON residents.address_id = addresses.address_id
      LEFT JOIN contacts ON residents.contact_id = contacts.contact_id
      LEFT JOIN occupations ON residents.occupation_id = occupations.occupation_id
      LEFT JOIN benefits ON residents.benefit_id = benefits.benefit_id
      LEFT JOIN nationalities ON residents.nationality_id = nationalities.nationality_id
      LEFT JOIN religions ON residents.religion_id = religions.religion_id
      LEFT JOIN house_numbers AS hn1 ON addresses.house_number_id = hn1.house_number_id
      LEFT JOIN streets ON addresses.street_id = streets.street_id
      LEFT JOIN barangays ON addresses.barangay_id = barangays.barangay_id
      WHERE residents.resident_id = ?`,
      values: [id],
    })

    console.log('Query Result:', user)

    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    return APIResponse(user, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
