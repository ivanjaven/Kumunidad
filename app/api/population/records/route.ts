import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Execute the database query to fetch user details by ID
    const user = await Query({
      query: `
        SELECT 
          r.resident_id AS id, r.full_name AS name,
          r.gender, 
          TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) AS age,
          CASE 
            WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) < 1 THEN 'New born'
            WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 1 AND 12 THEN 'Child'
            WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 13 AND 19 THEN 'Teenager'
            WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 20 AND 59 THEN 'Adult'
            WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) >= 60 THEN 'Senior Citizen'
            ELSE 'Unknown'
          END AS age_category,
          r.civil_status AS status,
          s.street_name AS street,
          CASE 
            WHEN o.occupation_name = 'N/A' THEN 'Unemployed'
            ELSE 'Employed'
          END AS occupation
        FROM residents r
        LEFT JOIN addresses a ON r.resident_id = a.resident_id
        LEFT JOIN streets s ON a.street_id = s.street_id
        LEFT JOIN occupations o ON r.occupation_id = o.occupation_id
        WHERE r.is_archived = false
      `,
      values: [],
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
