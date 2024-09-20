import { type NextRequest, NextResponse } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'
import { compare } from 'bcryptjs'
import { generateToken } from '@/server/services/token-generator'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    APILogger(request, { username })

    const users = await Query({
      query: 'SELECT * FROM auth WHERE username = ?',
      values: [username],
    })

    if (users.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    // Loop through users and compare the password
    let foundUser = null
    for (const user of users) {
      const passwordMatch = await compare(password, user.password)
      if (passwordMatch) {
        foundUser = user
        break
      }
    }

    if (!foundUser) {
      return APIResponse({ error: 'Invalid credentials' }, 401)
    }

    // Authentication successful, generate JWT token
    const token = await generateToken({
      userId: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    })

    const response = NextResponse.json(
      {
        username: foundUser.username,
        resident_id: foundUser.resident_id,
        role: foundUser.role,
      },
      { status: 200 },
    )

    // Set the JWT token as an HttpOnly cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    console.log('API authentication successful')
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
