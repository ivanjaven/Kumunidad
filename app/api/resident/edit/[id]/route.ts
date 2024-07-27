import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

const validResidentColumns = [
  'full_name',
  'first_name',
  'last_name',
  'middle_name',
  'date_of_birth',
  'gender',
  'civil_status',
  'address_id',
  'contact_id',
  'occupation_id',
  'nationality_id',
  'religion_id',
  'benefit_id',
]

type QueryParams = {
  query: string
  values: (string | number | boolean | null)[]
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    APILogger(request, params)

    const { id } = params

    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    const existingRowQuery = 'SELECT * FROM residents WHERE resident_id = ?'
    const existingRow = await Query({
      query: existingRowQuery,
      values: [id],
    })

    if (existingRow.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    const existingData = existingRow[0]
    const {
      address_id,
      contact_id,
      occupation_id,
      nationality_id,
      religion_id,
      benefit_id,
    } = existingData

    const body = await request.json()

    const fieldsToUpdate = Object.keys(body).filter((field) =>
      validResidentColumns.includes(field),
    )
    const valuesToUpdate = fieldsToUpdate.map(
      (field) => body[field] as string | number | boolean | null,
    )

    if (fieldsToUpdate.length === 0) {
      return APIResponse({ error: 'No valid fields to update' }, 400)
    }

    const updateResidentQuery = `
      UPDATE residents
      SET ${fieldsToUpdate.map((field) => `${field} = ?`).join(', ')}
      WHERE resident_id = ?
    `

    const updateResidentValues: (string | number | boolean | null)[] = [
      ...valuesToUpdate,
      id,
    ]

    const updateResidentResult = await Query({
      query: updateResidentQuery,
      values: updateResidentValues,
    })

    if (updateResidentResult.affectedRows === 0) {
      return APIResponse({ error: 'User not found or no changes made' }, 404)
    }

    const updateRelatedTable = async (
      tableName: string,
      newValues: any,
      primaryKey: string,
      primaryKeyValue: any,
    ) => {
      if (newValues && Object.keys(newValues).length > 0) {
        const existingRowQuery = `SELECT * FROM ${tableName} WHERE ${primaryKey} = ?`
        const existingRow = await Query({
          query: existingRowQuery,
          values: [primaryKeyValue],
        })

        if (existingRow.length === 0) {
          return APIResponse(
            { error: `${tableName.slice(0, -1)} not found` },
            404,
          )
        }

        const updateQuery = `
          UPDATE ${tableName}
          SET ${Object.keys(newValues)
            .map((field) => `${field} = ?`)
            .join(', ')}
          WHERE ${primaryKey} = ?
        `
        const updateValues = [...Object.values(newValues), primaryKeyValue]
        const result = await Query({
          query: updateQuery,
          values: updateValues,
        })

        return result
      }
      return null
    }

    await updateRelatedTable('contacts', body.contact, 'contact_id', contact_id)
    await updateRelatedTable(
      'addresses',
      body.address,
      'address_id',
      address_id,
    )
    await updateRelatedTable(
      'occupations',
      body.occupation,
      'occupation_id',
      occupation_id,
    )
    await updateRelatedTable(
      'nationalities',
      body.nationality,
      'nationality_id',
      nationality_id,
    )
    await updateRelatedTable(
      'religions',
      body.religion,
      'religion_id',
      religion_id,
    )
    await updateRelatedTable('benefits', body.benefit, 'benefit_id', benefit_id)

    return APIResponse({ message: 'User updated successfully' }, 200)
  } catch (error: any) {
    console.error('Database update failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
