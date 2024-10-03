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

    console.log('Fetching user with ID:', id)

    // Execute the database query to fetch user details by ID
    const user = await Query({
      query: `
      SELECT 
    r.resident_id,
    r.full_name,
    r.gender,
    r.image_base64,
    r.date_of_birth,
    r.civil_status,
    o.occupation_name AS occupation,
    n.nationality_name AS nationality,
    rel.religion_name AS religion,
    b.benefit_name AS benefits
FROM 
    residents r
LEFT JOIN 
    occupations o ON r.occupation_id = o.occupation_id
LEFT JOIN 
    nationalities n ON r.nationality_id = n.nationality_id
LEFT JOIN 
    religions rel ON r.religion_id = rel.religion_id
LEFT JOIN 
    benefits b ON r.benefit_id = b.benefit_id
WHERE 
    r.resident_id  = ?
    `,
      values: [id],
    })

    console.log('Query Result:', user)

    // Check if the user was found
    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    // Return the formatted response
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
