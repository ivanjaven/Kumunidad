import { type NextRequest } from 'next/server'

export function APILogger(request: NextRequest, params: any) {
  console.log('Incoming request:', {
    method: request.method,
    url: request.url,
    headers: JSON.stringify(Object.fromEntries(request.headers.entries())),
    params,
    body: request.body,
    query: Object.fromEntries(new URL(request.url).searchParams.entries()),
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent'),
  })
}
