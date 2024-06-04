import { NextResponse } from 'next/server'

export const APIResponse = (body: object, status: number) => {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
