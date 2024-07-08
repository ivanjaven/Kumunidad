import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const is_archived = body.is_archived
    const resident_id = body.resident_id


    if (!is_archived || !resident_id) {
      return APIResponse(
        { error: 'All parameters are required' },
        400,
      )
    }

    const residents = await Query({
      query: 'UPDATE residents SET is_archived = ? WHERE resident_id = ?',
      values: [is_archived, resident_id],
    })

    if (residents.length === 0) {
      return APIResponse({ error: 'Residents not found' }, 404)
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
