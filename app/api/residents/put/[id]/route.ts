// Import necessary modules
import { NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

// Define types for query parameters if needed
type QueryParams = {
  query: string
  values: (string | number | boolean | null)[]
}

// Define the PUT function for handling update requests
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Log the request and parameters for debugging
    APILogger(request, params)

    // Extract the id parameter from params
    const { id } = params

    // Validate the presence of the id parameter
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    // Parse the JSON body from the request
    const body = await request.json()

    // Extract keys and values from the body
    const fieldsToUpdate = Object.keys(body)
    const valuesToUpdate = Object.values(body) as (
      | string
      | number
      | boolean
      | null
    )[]

    // Validate that there are fields to update
    if (fieldsToUpdate.length === 0) {
      return APIResponse({ error: 'No fields to update' }, 400)
    }

    // Construct the SQL UPDATE query
    const updateQuery = `
      UPDATE citizens
      SET ${fieldsToUpdate.map((field) => `${field} = ?`).join(', ')}
      WHERE citizen_id = ?
    `

    // Prepare the values to be updated in the query
    const updateValues: (string | number | boolean | null)[] = [
      ...valuesToUpdate,
      id,
    ]

    // Execute the UPDATE query using the Query function
    const result = await Query({
      query: updateQuery,
      values: updateValues,
    })

    // Log the result of the update operation for debugging
    console.log('Update Result:', result)

    // Check if no rows were affected by the update (user not found or no changes made)
    if (result.affectedRows === 0) {
      return APIResponse({ error: 'User not found or no changes made' }, 404)
    }

    // Return a success response if the update was successful
    return APIResponse({ message: 'User updated successfully' }, 200)
  } catch (error: any) {
    // Handle errors that occur during the update process
    console.error('Database update failed:', error)

    // Use APIErrHandler to handle specific types of errors (if implemented)
    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    // Return a generic internal server error response if no specific handling is done
    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
