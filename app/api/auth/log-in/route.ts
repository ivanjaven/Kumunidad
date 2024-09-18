import { type NextRequest, NextResponse } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'
import { compare } from 'bcryptjs'
import { generateToken } from '@/server/services/token-generator'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { username, password } = await request.json()

    // Log the incoming request without sensitive information
    APILogger(request, { username })

    console.log('Authenticating user')

    // Execute the database query to fetch the user
    const users = await Query({
      query: 'SELECT * FROM auth WHERE username = ?',
      values: [username],
    })

    console.log('Query Result:', users)

    // Check if user was found
    if (users.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    const user = users[0]

    // Compare the provided password with the stored hash
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return APIResponse({ error: 'Invalid credentials' }, 401)
    }

    // Authentication successful, generate JWT token
    const token = await generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.json(
      {
        username: user.username,
        resident_id: user.resident_id,
        role: user.role,
      },
      { status: 200 },
    )

    // Set the JWT token as an HttpOnly cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    })

    console.log('IN the api')
    console.log(response)

    return response
  } catch (error: any) {
    console.error('Authentication error:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
