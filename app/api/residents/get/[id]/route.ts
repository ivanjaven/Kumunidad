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
        citizens.citizen_id,
        citizens.full_name,
        citizens.first_name,
        citizens.last_name,
        citizens.middle_name,
        citizens.gender,
        citizens.date_of_birth,
        citizens.status_id,
        citizens.address_id,
        citizens.contact_id,
        citizens.occupation_id,
        citizens.nationality_id,
        citizens.religion_id,
        citizens.benefit_id,
        addresses.house_number_id,
        addresses.street_id,
        addresses.barangay_id,
        addresses.municipality_id,
        addresses.province_id,
        contacts.email,
        contacts.mobile,
        status.status_name,
        religions.religion_name,
        occupations.occupation_name,
        nationalities.nationality_name,
        benefits.benefit_name,
        house_numbers.house_number,
        streets.street_name,
        barangays.barangay_name,
        municipalities.municipality_name,
        provinces.province_name
      FROM citizens
      LEFT JOIN addresses ON citizens.address_id = addresses.address_id
      LEFT JOIN contacts ON citizens.contact_id = contacts.contact_id
      LEFT JOIN occupations ON citizens.occupation_id = occupations.occupation_id
      LEFT JOIN status ON citizens.status_id = status.status_id
      LEFT JOIN benefits ON citizens.benefit_id = benefits.benefit_id
      LEFT JOIN nationalities ON citizens.nationality_id = nationalities.nationality_id
      LEFT JOIN religions ON citizens.religion_id = religions.religion_id
      LEFT JOIN house_numbers ON addresses.house_number_id = house_numbers.house_number_id
      LEFT JOIN streets ON house_numbers.street_id = streets.street_id
      LEFT JOIN barangays ON streets.barangay_id = barangays.barangay_id
      LEFT JOIN municipalities ON barangays.municipality_id = municipalities.municipality_id
      LEFT JOIN provinces ON municipalities.province_id = provinces.province_id
      WHERE citizens.citizen_id = ?`,
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
