import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

// Define types for database results
type Occupation = {
  id: number
  type: string
}

type Benefit = {
  id: number
  type: string
}

type Religion = {
  id: number
  type: string
}

type Nationality = {
  id: number
  type: string
}

type Street = {
  id: number
  name: string
}

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
    APILogger(request, null)

    console.log(
      'Fetching all occupations, benefits, religions, nationalities, and streets',
    )

    // Fetching occupations
    const occupations: Occupation[] = await Query({
      query: `
      SELECT 
        occupation_id AS id,
        occupation_name AS type
      FROM occupations
      `,
      values: [],
    })

    console.log('Occupations Query Result:', occupations)

    // Fetching benefits
    const benefits: Benefit[] = await Query({
      query: `
      SELECT 
        benefit_id AS id,
        benefit_name AS type
      FROM benefits
      `,
      values: [],
    })

    console.log('Benefits Query Result:', benefits)

    // Fetching religions
    const religions: Religion[] = await Query({
      query: `
      SELECT
        religion_id AS id,
        religion_name AS type
      FROM religions
      `,
      values: [],
    })

    console.log('Religions Query Result:', religions)

    // Fetching nationalities
    const nationalities: Nationality[] = await Query({
      query: `
      SELECT
        nationality_id AS id,
        nationality_name AS type
      FROM nationalities
      `,
      values: [],
    })

    console.log('Nationalities Query Result:', nationalities)

    // Fetching streets
    const streets: Street[] = await Query({
      query: `
      SELECT
        street_id AS id,
        street_name AS name
      FROM streets
      `,
      values: [],
    })

    console.log('Streets Query Result:', streets)

    // Formatting response to match dummyData structure
    const response: ResponseData = {
      benefits: benefits.map((item: Benefit) => ({
        id: item.id,
        type: item.type,
      })),
      occupation: occupations.map((item: Occupation) => ({
        id: item.id,
        type: item.type,
      })),
      street: streets.map((item: Street) => ({ id: item.id, name: item.name })),
      nationality: nationalities.map((item: Nationality) => ({
        id: item.id,
        type: item.type,
      })),
      religion: religions.map((item: Religion) => ({
        id: item.id,
        type: item.type,
      })),
    }

    if (
      response.benefits.length === 0 &&
      response.occupation.length === 0 &&
      response.street.length === 0 &&
      response.nationality.length === 0 &&
      response.religion.length === 0
    ) {
      return APIResponse({ error: 'No data found' }, 404)
    }

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
