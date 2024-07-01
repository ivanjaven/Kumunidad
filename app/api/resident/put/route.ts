import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const flag_archived = body.flag_archived
    const citizen_id = body.citizen_id


    if (!flag_archived || !citizen_id) {
      return APIResponse(
        { error: 'All parameters are required' },
        400,
      )
    }

    const citizens = await Query({
      query: 'UPDATE citizens SET flag_archived = ? WHERE citizen_id = ?',
      values: [flag_archived, citizen_id],
    })

    if (citizens.length === 0) {
      return APIResponse({ error: 'Citizens not found' }, 404)
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
