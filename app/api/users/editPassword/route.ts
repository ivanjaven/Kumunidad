import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

// Utility function to hash the password (add your hashing logic here)
const hashPassword = (password: string) => {
  // Example hashing logic, replace with your actual hashing function
  return 'hashed_' + password
}

export async function POST(request: NextRequest) {
  try {
    // Extract the body from the request
    const { fingerprint, oldPassword, newPassword } = await request.json()

    APILogger(request, { fingerprint, oldPassword, newPassword })

    if (!newPassword) {
      return APIResponse({ error: 'New password is required' }, 400)
    }

    if (fingerprint && oldPassword) {
      return APIResponse(
        { error: 'Only one of fingerprint or old password is required' },
        400,
      )
    }

    let updateQuery: { query: string; values: any[] } | null = null

    if (fingerprint) {
      // Check if fingerprint is a valid base64 string
      if (typeof fingerprint !== 'string') {
        return APIResponse({ error: 'Invalid fingerprint format' }, 400)
      }

      // Hash the new password
      const hashedPassword = hashPassword(newPassword)

      // Initialize the updateQuery for fingerprint
      updateQuery = {
        query: `
          UPDATE auth
          SET password = ?
          WHERE fingerprint_base64 = ?`,
        values: [hashedPassword, fingerprint],
      }
    } else if (oldPassword) {
      // Handle old password case
      // Retrieve the user based on the old password
      // For example:
      const user = await Query({
        query: `
          SELECT * FROM auth
          WHERE password = ?`,
        values: [hashPassword(oldPassword)],
      })

      if (user.length === 0) {
        return APIResponse({ error: 'Old password is incorrect' }, 401)
      }

      // Hash the new password
      const hashedPassword = hashPassword(newPassword)

      // Initialize the updateQuery for old password
      updateQuery = {
        query: `
          UPDATE auth
          SET password = ?
          WHERE password = ?`,
        values: [hashedPassword, hashPassword(oldPassword)],
      }
    } else {
      return APIResponse(
        { error: 'Either fingerprint or old password is required' },
        400,
      )
    }

    if (!updateQuery) {
      return APIResponse({ error: 'Update query not initialized' }, 500)
    }

    // Update the password in the database
    const result = await Query(updateQuery)

    if (result.affectedRows === 0) {
      return APIResponse({ error: 'User not found or no changes made' }, 404)
    }

    console.log('Password updated successfully')

    // Return a success message
    return APIResponse({ message: 'Password updated successfully' }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
