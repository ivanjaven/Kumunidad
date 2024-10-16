import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request without parameters
    APILogger(request, null)

    console.log('Fetching all users')

    // Execute the database query to fetch all users
    const users = await Query({
      query: `
      SELECT a.auth_id, r.full_name, r.image_base64, a.role
      FROM auth a
      JOIN residents r ON a.resident_id = r.resident_id
    `,
    })

    console.log('Query Result:', users)

    // Check if any users were found
    if (users.length === 0) {
      return APIResponse({ error: 'No users found' }, 404)
    }

    // Return the formatted response
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
