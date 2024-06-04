import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const email = body.email
    const password = body.password

    if (!email || !password) {
      return APIResponse(
        { error: 'Email and password parameters are required' },
        400,
      )
    }

    const users = await Query({
      query: 'SELECT * FROM users WHERE email = ? AND password = ?',
      values: [email, password],
    })

    if (users.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    return APIResponse(users, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
