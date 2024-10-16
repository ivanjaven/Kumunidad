import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Log the incoming request and parameters
    APILogger(request, params)

    const { id } = params

    // Validate that the ID parameter is provided
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    console.log('Deleting user with ID:', id)

    // Execute the database query to delete auth details by ID
    const result = await Query({
      query: `
      DELETE FROM officers_batch WHERE batch_id  = ?
    `,
      values: [id],
    })

    console.log('Query Result:', result)

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    // Return the formatted response
    return APIResponse({ message: 'User deleted successfully' }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
