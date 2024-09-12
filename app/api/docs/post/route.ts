import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  console.log('POST route hit')
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    console.log('Parsing request body')
    const body = await request.json()
    console.log('Received body:', body)

    // Extract document issuance data from request body
    const { document_title, resident_id, required_fields, issued_by, price } =
      body

    console.log('Extracted fields:', {
      document_title,
      resident_id,
      required_fields,
      issued_by,
      price,
    })

    // Validate required fields
    if (
      !document_title ||
      !resident_id ||
      !required_fields ||
      !issued_by ||
      price === undefined
    ) {
      console.log('Validation failed: missing required fields')
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    // // Validate document_title enum
    // const validDocumentTitles = [
    //   'Barangay Business Clearance',
    //   'Barangay Clearance',
    //   'Certificate of Indigency',
    //   'Certificate of Residency',
    // ]
    // if (!validDocumentTitles.includes(document_title)) {
    //   console.log('Validation failed: invalid document_title')
    //   return APIResponse({ error: 'Invalid document_title' }, 400)
    // }

    console.log('Attempting database query')
    // Insert document issuance record
    const result = await Query({
      query:
        'INSERT INTO documents (document_title, resident_id, required_fields, issued_by, price) VALUES (?, ?, ?, ?, ?)',
      values: [
        document_title,
        resident_id,
        JSON.stringify(required_fields),
        issued_by,
        price,
      ],
    })

    console.log('Query result:', result)

    return APIResponse(
      {
        message: 'Document issuance record inserted successfully',
        id: result.insertId,
      },
      201,
    )
  } catch (error: any) {
    console.error('Caught error in API route:', error)
    console.error('Error stack:', error.stack)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
