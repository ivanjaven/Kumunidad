import { NextRequest, NextResponse } from 'next/server'
import { createReport } from 'docx-templates'
import fs from 'fs/promises'
import path from 'path'
import libre from 'libreoffice-convert'
import util from 'util'

const convertAsync = util.promisify(libre.convert)

function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('Received data:', data)

    const today = new Date()
    const fullName = `${data.firstName} ${data.surname}`.trim()
    const monthNamesShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const templatePath = path.join(process.cwd(), 'public', data.template)
    console.log('Template path:', templatePath)

    const template = await fs.readFile(templatePath)
    console.log('Template loaded, size:', template.length, 'bytes')

    const docxBuffer = await createReport({
      template,
      data: {
        name: fullName,
        surname: data.surname,
        purokNumber: data.purok,
        price: data.price,
        date: today.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        dateNum: today.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        }),
        dayNum: `${today.getDate()}${getDaySuffix(today.getDate())}`,
        month: monthNamesShort[today.getMonth()],
        year: today.getFullYear().toString(),
        businessName: data.businessName || ' ',
        address: data.street_id,
        dueDate: `December 31, ${today.getFullYear().toString()}`,
        // Add checkbox data
        burial: data.burial || ' ',
        education: data.education || ' ',
        medical: data.medical || ' ',
        financial: data.financial || ' ',
        others: data.others || ' ',
        // Add reason field
        reason:
          data.reason ||
          'The income of his/her family is barely enough to meet their day to day needs.',
      },
      cmdDelimiter: ['{', '}'],
    })
    console.log('Report created, size:', docxBuffer.length, 'bytes')

    // Convert DOCX to PDF
    const pdfBuffer = await convertAsync(
      Buffer.from(docxBuffer),
      '.pdf',
      undefined,
    )
    console.log('PDF created, size:', pdfBuffer.length, 'bytes')

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=document.pdf',
      },
    })
  } catch (error: unknown) {
    console.error('Error in API route:', error)
    let errorMessage = 'An unknown error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { error: 'Error processing request', details: errorMessage },
      { status: 500 },
    )
  }
}
