import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    // Extract the body from the request
    const { username, password } = await request.json()

    APILogger(request, { username, password })

    if (!username || !password) {
      return APIResponse({ error: 'Username and password are required' }, 400)
    }

    console.log('Fetching user with username:', username)

    // Query to get the user with the provided username along with role information
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
      WHERE auth.username = ?`,
      values: [username],
    })

    console.log('Query Result:', users)

    if (users.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    const user = users[0]

    // Compare the provided password with the stored plain text password
    if (password !== user.password) {
      return APIResponse({ error: 'Invalid password' }, 401)
    }

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
