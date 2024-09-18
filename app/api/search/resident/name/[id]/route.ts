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
    // Log the incoming request and parameters
    APILogger(request, params)

    const { id } = params
    if (!id) {
      return APIResponse({ error: 'Name parameter is required' }, 400)
    }

    console.log('Fetching users with names starting with:', id)

    // Execute the database query to fetch user details by ID
    const users = await Query({
      query: `
      SELECT 
        r.resident_id AS id,
        r.full_name AS name,
        r.image_base64 AS image
      FROM residents r
      WHERE r.full_name LIKE ? LIMIT 7
    `,
      values: [`${id}%`],
    })

    console.log('Query Result:', users)

    // Check if the user was found
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
