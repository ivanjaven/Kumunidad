import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const document_id = body.document_id
    const resident_id = body.resident_id
    const issued_date = body.issued_date
    const issued_by = body.issued_by
    
    if (!document_id || !resident_id || !issued_by) {
      return APIResponse(
        { error: 'All parameters needed are required' },
        400,
      )
    }

    const residents = await Query({
      query: 'INSERT INTO issued_documents (document_id, resident_id, issued_date, issued_by) VALUES (?, ?, CURRENT_TIMESTAMP, ?)',
      values: [document_id, resident_id, issued_by],
    })

    if (residents.length === 0) {
      return APIResponse({ error: 'Resident not found' }, 404)
    }

    return APIResponse(residents, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}