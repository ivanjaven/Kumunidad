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
    const date_of_birth = body.date_of_birth
    const status_id = body.status_id
    const address_id = body.address_id
    const contact_id = body.contact_id
    const occupation_id = body.occupation_id
    const nationality_id = body.nationality_id
    const religion_id = body.religion_id
    const benefit_id = body.benefit_id
    const flag_archived = body.flag_archived

    if (!full_name || !first_name || !last_name || !middle_name || !gender || !date_of_birth || !flag_archived || !status_id || !address_id || !contact_id || !occupation_id || !nationality_id || !religion_id || !benefit_id) {
      return APIResponse(
        { error: 'All parameters needed are required' },
        400,
      )
    }

    const citizens = await Query({
      query: 'INSERT INTO citizens (full_name, first_name, last_name, middle_name, gender, date_of_birth, status_id, address_id, contact_id, occupation_id, nationality_id, religion_id, benefit_id, flag_archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
      values: [full_name, first_name, last_name, middle_name, gender, date_of_birth, status_id, address_id, contact_id, occupation_id, nationality_id, religion_id, benefit_id, flag_archived],
    })

    if (citizens.length === 0) {
      return APIResponse({ error: 'Citizen not found' }, 404)
    }

    return APIResponse(citizens, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}