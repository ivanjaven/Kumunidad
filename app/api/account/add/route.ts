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
    const { role, resident_id, username, password } = body

    // Validate required fields
    if (!role || !resident_id || !username || !password) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    // Insert resident information
    const residentResult = await Query({
      query:
        'INSERT INTO auth (role, resident_id, username, password) VALUES (?, ?, ?, ?)',
      values: [role, resident_id, username, password],
    })

    // Extract resident ID from the inserted
    const residentId = residentResult.insertId

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
