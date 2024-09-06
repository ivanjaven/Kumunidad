// import { type NextRequest } from 'next/server'
// import { APIResponse } from '@/lib/api-res-helper'
// import { APIErrHandler } from '@/lib/api-err-handler'
// import { APILogger } from '@/lib/api-req-logger'
// import { Query } from '@/lib/db-con-helper'

// export async function PUT(request: NextRequest) {
//   try {
//     APILogger(request, null)

//     const body = await request.json()
//     const document_id = body.document_id
//     const resident_id = body.resident_id
//     const issued_date = body.issued_date
//     const issued_by = body.issued_by
//     const issued_document_id = body.issued_document_id

//     if (!document_id || !issued_document_id) {
//       return APIResponse({ error: 'All parameters are required' }, 400)
//     }

//     const residents = await Query({
//       query:
//         'UPDATE issued_documents SET document_id = ? WHERE issued_document_id = ?',
//       values: [document_id, issued_document_id],
//     })

//     if (residents.length === 0) {
//       return APIResponse({ error: 'Residents not found' }, 404)
//     }

//     return APIResponse(residents, 200)
//   } catch (error: any) {
//     console.error('Database query failed:', error)

//     const apiError = APIErrHandler(error)
//     if (apiError) {
//       return apiError
//     }

//     return APIResponse({ error: 'Internal server error' }, 500)
//   }
// }

import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const { document_id, document_title, required_fields, issued_by, price } =
      body

    if (
      !document_id ||
      !document_title ||
      !required_fields ||
      !issued_by ||
      price === undefined
    ) {
      return APIResponse({ error: 'All parameters are required' }, 400)
    }

    const result = await Query({
      query:
        'UPDATE documents SET document_title = ?, required_fields = ?, issued_by = ?, price = ? WHERE document_id = ?',
      values: [
        document_title,
        JSON.stringify(required_fields),
        issued_by,
        price,
        document_id,
      ],
    })

    if (result.affectedRows === 0) {
      return APIResponse({ error: 'Document not found' }, 404)
    }

    return APIResponse({ message: 'Document updated successfully' }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)
    const apiError = APIErrHandler(error)
    if (apiError) return apiError
    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
