import { NextResponse } from 'next/server'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const documentType = searchParams.get('type')

    if (!documentType) {
      return NextResponse.json(
        { error: 'Document type is required' },
        { status: 400 },
      )
    }

    console.log('Fetching config for document type:', documentType)

    const result = await Query({
      query:
        'SELECT * FROM documents WHERE document_title = ? AND resident_id IS NULL LIMIT 1',
      values: [documentType],
    })

    console.log('Query result:', result)

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Document type not found' },
        { status: 404 },
      )
    }

    const documentConfig = result[0]
    const fields = JSON.parse(documentConfig.required_fields)

    return NextResponse.json({
      name: documentConfig.document_title,
      fields: fields,
      price: documentConfig.price,
    })
  } catch (error: any) {
    console.error('Database query failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
