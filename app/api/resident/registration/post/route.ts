import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()

    const full_name = body.full_name
    const first_name = body.first_name
    const last_name = body.last_name
    const middle_name = body.middle_name
    const gender = body.gender
    const image_base64 = body.image_base64
    const fingerprint_base64 = body.fingerprint_base64
    const date_of_birth = body.date_of_birth
    const civil_status = body.civil_status
    const barangay_status = body.barangay_status
    const address_id = body.address_id
    const email = body.email
    const phone = body.phone
    const occupation_id = body.occupation_id
    const nationality_id = body.nationality_id
    const religion_id = body.religion_id
    const benefit_id = body.benefit_id

    if (
      !full_name ||
      !first_name ||
      !last_name ||
      !middle_name ||
      !gender ||
      !date_of_birth ||
      !civil_status ||
      !barangay_status ||
      !address_id ||
      !email ||
      !phone ||
      !occupation_id ||
      !nationality_id ||
      !religion_id ||
      !benefit_id
    ) {
      return APIResponse({ error: 'All parameters needed are required' }, 400)
    }

    // Insert contact information and get contact_id
    const contactResult = await Query({
      query: 'INSERT INTO contacts (email, mobile) VALUES (?, ?)',
      values: [email, phone],
    })

    const contact_id = contactResult.insertId

    const residents = await Query({
      query:
        'INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, image_base64, fingerprint_base64, date_of_birth, civil_status, barangay_status, address_id, contact_id, occupation_id, nationality_id, religion_id, benefit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [
        full_name,
        first_name,
        last_name,
        middle_name,
        gender,
        image_base64,
        fingerprint_base64,
        date_of_birth,
        civil_status,
        barangay_status,
        address_id,
        contact_id,
        occupation_id,
        nationality_id,
        religion_id,
        benefit_id,
      ],
    })

    if (residents.affectedRows === 0) {
      return APIResponse({ error: 'Failed to insert resident' }, 500)
    }

    return APIResponse(
      { message: 'Resident inserted successfully', id: residents.insertId },
      201,
    )
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
