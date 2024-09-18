import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

interface Officer {
  role: string
  name: string
  image: string
}

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    let body
    try {
      body = await request.json()
      console.log('Request body:', JSON.stringify(body, null, 2))
    } catch (error) {
      console.error('Error parsing request body:', error)
      return APIResponse({ error: 'Invalid JSON in request body' }, 400)
    }

    if (typeof body !== 'object' || body === null) {
      return APIResponse({ error: 'Invalid request body' }, 400)
    }

    const { stateForStartingYear, stateForEndingYear } = body

    if (!stateForStartingYear || !stateForEndingYear) {
      return APIResponse({ error: 'Missing year information' }, 400)
    }

    // Insert into officers_batch table
    const term = `${stateForStartingYear}-${stateForEndingYear}`
    let batchId
    try {
      console.log('Attempting to insert into officers_batch with term:', term)
      const result = await Query({
        query: 'INSERT INTO officers_batch (term) VALUES (?)',
        values: [term],
      })
      console.log('Query result:', JSON.stringify(result, null, 2))

      if (!result || typeof result.insertId !== 'number') {
        throw new Error('Invalid query result format')
      }

      batchId = result.insertId
      console.log(
        'Successfully inserted into officers_batch. BatchId:',
        batchId,
      )
    } catch (error) {
      console.error('Error inserting into officers_batch:', error)
      return APIResponse({ error: 'Database error when inserting batch' }, 500)
    }

    // Combine all officers into a single array
    const officerGroups = [
      'executiveOfficials',
      'stateForBarangaykagawads',
      'stateForBarangayLupongTagapamayapa',
      'stateForSKExecutiveOfficials',
      'stateForSKkagawads',
      'stateForBarangayTanod',
    ]

    const allOfficers: Officer[] = []

    for (const group of officerGroups) {
      if (Array.isArray(body[group])) {
        allOfficers.push(...body[group])
      }
    }

    console.log('All officers:', JSON.stringify(allOfficers, null, 2))

    // Insert officers into officers_role table
    const insertedOfficers = []
    for (const officer of allOfficers) {
      if (
        officer &&
        typeof officer === 'object' &&
        'role' in officer &&
        'name' in officer &&
        'image' in officer
      ) {
        try {
          const result = await Query({
            query:
              'INSERT INTO officers_role (batch_id, image_base64, full_name, role) VALUES (?, ?, ?, ?)',
            values: [batchId, officer.image, officer.name, officer.role],
          })
          if (result && typeof result.insertId === 'number') {
            insertedOfficers.push({ ...officer, id: result.insertId })
          } else {
            console.warn('Unexpected result when inserting officer:', result)
          }
        } catch (error) {
          console.error('Error inserting officer:', error)
          // Continue with the next officer even if one fails
        }
      } else {
        console.warn('Skipping invalid officer data:', officer)
      }
    }

    return APIResponse(
      { batchId, insertedOfficers, message: 'Officers created successfully' },
      201,
    )
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
