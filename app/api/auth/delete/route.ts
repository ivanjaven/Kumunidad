import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function DELETE(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const user_id = body.user_id

    if (!user_id) {
      return APIResponse({ error: 'All parameters needed are required' }, 400)
    }

    const residents = await Query({
      query: 'DELETE FROM auth WHERE user_id = ?',
      values: [user_id],
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
