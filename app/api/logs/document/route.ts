import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    APILogger(request, null)

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '25', 10)
    const offset = (page - 1) * limit

    const logs = await Query({
      query: `
        SELECT
          CASE document_title
            WHEN 'Barangay Business Clearance' THEN 'Bus. Clearance'
            WHEN 'Barangay Clearance' THEN 'Brgy. Clearance'
            WHEN 'Certificate of Indigency' THEN 'Indigency Cert.'
            WHEN 'Certificate of Residency' THEN 'Residency Cert.'
            ELSE LEFT(document_title, 15)
          END AS label,
          CONCAT(document_title, ' issued to ', r.full_name, ' by ', d.issued_by, ' - A fee of ₱', FORMAT(d.price, 2), ' was charged.') AS description,
          DATE_FORMAT(d.created_at, '%Y-%m-%d %H:%i:%s') AS date
        FROM documents d
        JOIN residents r ON d.resident_id = r.resident_id
        ORDER BY d.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      values: [limit, offset],
    })

    if (logs.length === 0 && page === 1) {
      return APIResponse({ message: 'No document logs found', data: [] }, 200)
    }

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
