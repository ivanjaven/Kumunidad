import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    // Extract the body from the request
    const { fingerprint } = await request.json()

    APILogger(request, { fingerprint })

    if (!fingerprint) {
      return APIResponse({ error: 'Fingerprint is required' }, 400)
    }

    console.log('Received fingerprint:', fingerprint)

    // Check if fingerprint is a valid base64 string
    if (typeof fingerprint !== 'string') {
      return APIResponse({ error: 'Invalid fingerprint format' }, 400)
    }

    console.log('Fetching user with fingerprint (base64):', fingerprint)

    // Query to get the user with the provided fingerprint
    const users = await Query({
      query: `
      SELECT 
        auth.user_id,
        auth.username,
        auth.password,
        auth.role_id,
        roles.role_name,
        auth.created_at,
        auth.updated_at
      FROM auth
      LEFT JOIN roles ON auth.role_id = roles.role_id
      WHERE auth.fingerprint_base64 = ?`,
      values: [fingerprint], // Directly use the base64 string
    })

    console.log('Query Result:', users)

    if (users.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    const user = users[0]

    // Remove the password field before sending the response
    delete user.password

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
