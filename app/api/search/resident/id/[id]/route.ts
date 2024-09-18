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
    // Log the incoming request and parameters
    APILogger(request, params)

    const { id } = params

    // Validate that the ID parameter is provided
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    console.log('Fetching user with ID:', id)

    // Execute the database query to fetch user details by ID
    const user = await Query({
      query: `
      SELECT
        r.resident_id, r.full_name, r.first_name, r.last_name, r.middle_name,
        r.gender, r.date_of_birth, r.civil_status, r.image_base64,
        r.is_archived, r.created_at, r.updated_at,
        a.address_id, s.street_id

      FROM residents r
      LEFT JOIN addresses a ON r.resident_id = a.resident_id
      LEFT JOIN streets s ON a.street_id = s.street_id
      LEFT JOIN barangays b ON a.barangay_id = b.barangay_id
      LEFT JOIN municipalities m ON a.municipality_id = m.municipality_id
      LEFT JOIN provinces p ON a.province_id = p.province_id
      LEFT JOIN contacts c ON r.resident_id = c.resident_id
      LEFT JOIN occupations o ON r.occupation_id = o.occupation_id
      LEFT JOIN nationalities n ON r.nationality_id = n.nationality_id
      LEFT JOIN religions rel ON r.religion_id = rel.religion_id
      LEFT JOIN benefits ben ON r.benefit_id = ben.benefit_id
      WHERE r.resident_id = ?
    `,
      values: [id],
    })

    console.log('Query Result:', user)

    // Check if the user was found
    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    // Return the formatted response
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

// r.civil_status, r.barangay_status,

// r.is_archived, r.created_at, r.updated_at,
// a.address_id, a.house_number, a.postal_code,
// s.street_id, s.street_name, s.street_type,
// b.barangay_id, b.barangay_name,
// m.municipality_id, m.municipality_name, m.municipality_type,
// p.province_id, p.province_name, p.region,
// c.contact_id, c.email, c.mobile,
// o.occupation_id, o.occupation_name,
// n.nationality_id, n.nationality_name,
// rel.religion_id, rel.religion_name,
// ben.benefit_id, ben.benefit_name
// LEFT JOIN addresses a ON r.resident_id = a.resident_id
// LEFT JOIN streets s ON a.street_id = s.street_id
// LEFT JOIN barangays b ON a.barangay_id = b.barangay_id
// LEFT JOIN municipalities m ON a.municipality_id = m.municipality_id
// LEFT JOIN provinces p ON a.province_id = p.province_id
// LEFT JOIN contacts c ON r.resident_id = c.resident_id
// LEFT JOIN occupations o ON r.occupation_id = o.occupation_id
// LEFT JOIN nationalities n ON r.nationality_id = n.nationality_id
// LEFT JOIN religions rel ON r.religion_id = rel.religion_id
// LEFT JOIN benefits ben ON r.benefit_id = ben.benefit_id
