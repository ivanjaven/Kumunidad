import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

// Define types for database results
type Occupation = { id: number; type: string }
type Benefit = { id: number; type: string }
type Religion = { id: number; type: string }
type Nationality = { id: number; type: string }
type Street = { id: number; name: string }

// Define the structure of the response
type ResponseData = {
  benefits: Benefit[]
  occupation: Occupation[]
  street: Street[]
  nationality: Nationality[]
  religion: Religion[]
}

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)
    console.log('Fetching all data categories')

    // Fetch data from database
    const occupations: Occupation[] = await Query({
      query:
        'SELECT occupation_id AS id, occupation_name AS type FROM occupations',
      values: [],
    })
    const benefits: Benefit[] = await Query({
      query: 'SELECT benefit_id AS id, benefit_name AS type FROM benefits',
      values: [],
    })
    const religions: Religion[] = await Query({
      query: 'SELECT religion_id AS id, religion_name AS type FROM religions',
      values: [],
    })
    const nationalities: Nationality[] = await Query({
      query:
        'SELECT nationality_id AS id, nationality_name AS type FROM nationalities',
      values: [],
    })
    const streets: Street[] = await Query({
      query: 'SELECT street_id AS id, street_name AS name FROM streets',
      values: [],
    })

    // Format response
    const response: ResponseData = {
      benefits: benefits.map((item) => ({ id: item.id, type: item.type })),
      occupation: occupations.map((item) => ({ id: item.id, type: item.type })),
      street: streets.map((item) => ({ id: item.id, name: item.name })),
      nationality: nationalities.map((item) => ({
        id: item.id,
        type: item.type,
      })),
      religion: religions.map((item) => ({ id: item.id, type: item.type })),
    }

    // Check if no data was found
    if (Object.values(response).every((array) => array.length === 0)) {
      return APIResponse({ error: 'No data found' }, 404)
    }

    // Return the formatted response
    return APIResponse(response, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
