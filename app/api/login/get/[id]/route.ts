import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    APILogger(request, params)

    const { id } = params
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    const user = await Query({
      query: 'SELECT * FROM users WHERE id = ?',
      values: [id],
    })

    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    return APIResponse(user, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
