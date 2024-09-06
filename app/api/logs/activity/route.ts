import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Extract query parameters for pagination
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10) // Current page number
    const limit = parseInt(searchParams.get('limit') || '25', 10) // Number of logs per page
    const offset = (page - 1) * limit // Calculate offset for pagination

    // Fetch data from the database using a complex query
    const logs = await Query({
      query: `
        WITH event_data AS (
          SELECT
            'New Resident' AS event_label,
            CONCAT(full_name, ' registered in the Barangay Management Information System.') AS event_description,
            created_at
          FROM residents

          UNION ALL

          SELECT
            CASE document_title
              WHEN 'Barangay Business Clearance' THEN 'Bus. Clearance'
              WHEN 'Barangay Clearance' THEN 'Brgy. Clearance'
              WHEN 'Certificate of Indigency' THEN 'Indigency Cert.'
              WHEN 'Certificate of Residency' THEN 'Residency Cert.'
              ELSE LEFT(document_title, 15)
            END AS event_label,
            CONCAT(document_title, ' issued to ', r.full_name, ' by ', d.issued_by, ' - A fee of ₱', FORMAT(d.price, 2), ' was charged.') AS event_description,
            d.created_at
          FROM documents d
          JOIN residents r ON d.resident_id = r.resident_id

          UNION ALL

          SELECT
            CASE
              WHEN ROW_NUMBER() OVER (PARTITION BY case_number_id ORDER BY created_at) = 1 THEN 'New Incident'
              ELSE 'Incident Update'
            END AS event_label,
            CONCAT('Case #', in_narr.case_number_id, ' - ', ir.title, ': ', LEFT(in_narr.narrative, 120), '...') AS event_description,
            in_narr.created_at
          FROM incident_narratives in_narr
          JOIN incident_reports ir ON in_narr.case_number_id = ir.case_number
        )
        SELECT
          event_label AS label,
          event_description AS description,
          DATE_FORMAT(created_at, '%a - %b %d, %Y - %h:%i %p') AS date
        FROM event_data
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      values: [limit, offset],
    })

    // Check if no data was found
    if (logs.length === 0 && page === 1) {
      return APIResponse({ message: 'No activity logs found', data: [] }, 200)
    }

    // Return the formatted response
    return APIResponse({ data: logs }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
