
import { type NextRequest, NextResponse } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { verifyToken } from '@/server/services/token-generator'

export async function GET(request: NextRequest) {
  try {
    APILogger(request, {})

    console.log('Validating token')

    const token = request.cookies.get('token')?.value

    if (!token) {
      return APIResponse({ error: 'No token provided' }, 401)
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return APIResponse({ error: 'Invalid token' }, 401)
    }

    return APIResponse(
      {
        authenticated: true,
        role: payload.role,
        username: payload.username,
        userId: payload.userId,
      },
      200,
    )
  } catch (error: any) {
    console.error('Token validation error:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
