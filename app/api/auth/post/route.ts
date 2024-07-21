import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const fingerprint_base64 = body.fingerprint_base64
    const role_id = body.role_id
    const password = body.password
    const username = body.username
    if (!username || !password || !role_id || !fingerprint_base64) {
      return APIResponse({ error: 'All parameters needed are required' }, 400)
    }

    const residents = await Query({
      query:
        'INSERT INTO auth (username, password, role_id, fingerprint_base64) VALUES (?, ?, ?, ?);',
      values: [username, password, role_id, fingerprint_base64],
    })

    if (residents.length === 0) {
      return APIResponse({ error: 'Resident not found' }, 404)
    }

    return APIResponse(residents, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
