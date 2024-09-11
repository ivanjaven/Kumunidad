import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Parse the request body
    const body = await request.json()

    // Extract resident data from request body
    const {
      full_name,
      first_name,
      last_name,
      middle_name,
      gender,
      image_base64,
      fingerprint_base64,
      date_of_birth,
      civil_status,
      house_number,
      street_id,
      barangay_id,
      municipality_id,
      province_id,
      postal_code,
      email,
      mobile,
      occupation_id,
      nationality_id,
      religion_id,
      benefit_id,
    } = body

    // Validate required fields
    if (
      !full_name ||
      !first_name ||
      !last_name ||
      !gender ||
      !image_base64 ||
      !fingerprint_base64 ||
      !date_of_birth ||
      !civil_status ||
      !house_number ||
      !street_id ||
      !barangay_id ||
      !municipality_id ||
      !province_id ||
      !postal_code ||
      !email ||
      !mobile ||
      !occupation_id ||
      !nationality_id ||
      !religion_id ||
      !benefit_id
    ) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    // Insert resident information
    const residentResult = await Query({
      query:
        'INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, image_base64, fingerprint_base64, date_of_birth, civil_status, occupation_id, nationality_id, religion_id, benefit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        occupation_id,
        nationality_id,
        religion_id,
        benefit_id,
      ],
    })

    // Extract resident ID from the inserted
    const residentId = residentResult.insertId

    // Insert address information
    await Query({
      query:
        'INSERT INTO addresses (resident_id, house_number, street_id, barangay_id, municipality_id, province_id, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [
        residentId,
        house_number,
        street_id,
        barangay_id,
        municipality_id,
        province_id,
        postal_code,
      ],
    })

    // Insert contact information
    await Query({
      query:
        'INSERT INTO contacts (resident_id, email, mobile) VALUES (?, ?, ?)',
      values: [residentId, email, mobile],
    })

    return APIResponse(
      {
        message: 'Resident, address, and contact inserted successfully',
        id: residentId,
      },
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
