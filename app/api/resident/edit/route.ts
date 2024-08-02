import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Parse the request body
    const body = await request.json()

    // Extract resident data from request body
    const {
      resident_id,
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
      !resident_id ||
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

    // Update resident information
    await Query({
      query:
        'UPDATE residents SET full_name = ?, first_name = ?, last_name = ?, middle_name = ?, gender = ?, image_base64 = ?, fingerprint_base64 = ?, date_of_birth = ?, civil_status = ?, occupation_id = ?, nationality_id = ?, religion_id = ?, benefit_id = ? WHERE resident_id = ?',
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
        resident_id,
      ],
    })

    // Update address information
    await Query({
      query:
        'UPDATE addresses SET house_number = ?, street_id = ?, barangay_id = ?, municipality_id = ?, province_id = ?, postal_code = ? WHERE resident_id = ?',
      values: [
        house_number,
        street_id,
        barangay_id,
        municipality_id,
        province_id,
        postal_code,
        resident_id,
      ],
    })

    // Update contact information
    await Query({
      query: 'UPDATE contacts SET email = ?, mobile = ? WHERE resident_id = ?',
      values: [email, mobile, resident_id],
    })

    return APIResponse(
      {
        message: 'Resident, address, and contact updated successfully',
        id: resident_id,
      },
      200,
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
