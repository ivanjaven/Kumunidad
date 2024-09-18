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

    // Validate that the ID parameter is provided
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    console.log('Fetching blog with ID:', id)

    // Execute the database query to fetch blog details by ID
    const blog = await Query({
      query: `
        SELECT role,
        full_name as name,
        image_base64 as image
        FROM officers_role
        WHERE batch_id = ?
      `,
      values: [id],
    })

    console.log('Query Result:', blog)

    // Check if the blog was found
    if (blog.length === 0) {
      return APIResponse({ error: 'blog not found' }, 404)
    }

    // Return the formatted response
    return APIResponse(blog, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
