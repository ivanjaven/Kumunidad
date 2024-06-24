import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

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

    const user = await Query({
      query: ` 
      SELECT 
        citizens.*,
        addresses.*,
        contacts.*,
        status.status_name,
        religions.religion_name,
        occupations.occupation_name,
        nationalities.nationality_name,
        benefits.benefit_name,
         issued_documents.*,
          documents.*,
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
        LEFT JOIN issued_documents ON citizens.citizen_id = issued_documents.citizen_id
        LEFT JOIN documents ON issued_documents.document_id = documents.document_id
        LEFT JOIN house_numbers ON addresses.house_number_id = house_numbers.house_number_id
        LEFT JOIN streets ON house_numbers.street_id = streets.street_id
        LEFT JOIN barangays ON streets.barangay_id = barangays.barangay_id
        LEFT JOIN municipalities ON barangays.municipality_id = municipalities.municipality_id
        LEFT JOIN provinces ON municipalities.province_id = provinces.province_id
        WHERE citizens.citizen_id = ?`
     ,
      values: [id],
    })

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

// citizens.*,
//         addresses.*,
//         contacts.*,
//         status.status_name,
//         religions.religion_name,
//         occupations.occupation_name,
//         nationalities.nationality_name,
//         benefits.benefit_name,
//          issued_documents.*,
//           documents.*,
//           house_numbers.house_number,
//           streets.street_name,
//           barangays.barangay_name,
//           municipalities.municipality_name,
//           provinces.province_name
//         FROM citizens
//         LEFT JOIN addresses ON citizens.address_id = addresses.address_id
//         LEFT JOIN contacts ON citizens.contact_id = contacts.contact_id
//         LEFT JOIN occupations ON citizens.occupation_id = occupations.occupation_id
//         LEFT JOIN status ON citizens.status_id = status.status_id
//         LEFT JOIN benefits ON citizens.benefit_id = benefits.benefit_id
//         LEFT JOIN nationalities ON citizens.nationality_id = nationalities.nationality_id
//         LEFT JOIN religions ON citizens.religion_id = religions.religion_id
//         LEFT JOIN issued_documents ON citizens.citizen_id = issued_documents.citizen_id
//         LEFT JOIN documents ON issued_documents.document_id = documents.document_id
//         LEFT JOIN house_numbers ON addresses.house_number_id = house_numbers.house_number_id
//         LEFT JOIN streets ON house_numbers.street_id = streets.street_id
//         LEFT JOIN barangays ON streets.barangay_id = barangays.barangay_id
//         LEFT JOIN municipalities ON barangays.municipality_id = municipalities.municipality_id
//         LEFT JOIN provinces ON municipalities.province_id = provinces.province_id
