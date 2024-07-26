import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()

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
      barangay_status,
      house_number,
      street_id,
      barangay_id,
      municipality_id,
      province_id,
      postal_code,
      email,
      phone,
      occupation_id,
      nationality_id,
      religion_id,
      benefit_id,
    } = body
    if (
      !full_name ||
      !first_name ||
      !last_name ||
      !gender ||
      !date_of_birth ||
      !civil_status ||
      !barangay_status ||
      !house_number ||
      !street_id ||
      !barangay_id ||
      !municipality_id ||
      !province_id ||
      !postal_code ||
      !occupation_id ||
      !nationality_id ||
      !religion_id ||
      !benefit_id
    ) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // Insert house number and get house_number_id
    const houseNumberResult = await Query({
      query:
        'INSERT INTO house_numbers (house_number, street_id) VALUES (?, ?)',
      values: [house_number, street_id],
    })

    const house_number_id = houseNumberResult.insertId

    const addressResult = await Query({
      query:
        'INSERT INTO addresses (house_number_id, street_id, barangay_id, municipality_id, province_id, postal_code) VALUES (?, ?, ?, ?, ?, ?)',
      values: [
        house_number_id,
        street_id,
        barangay_id,
        municipality_id,
        province_id,
        postal_code,
      ],
    })

    const address_id = addressResult.insertId

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Insert contact information and get contact_id
    const contactResult = await Query({
      query: 'INSERT INTO contacts (email, mobile) VALUES (?, ?)',
      values: [email, phone],
    })

    const contact_id = contactResult.insertId

    /////////////////////////////

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
