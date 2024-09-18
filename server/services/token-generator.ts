import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET =
  process.env.JWT_SECRET ?? '@#kdfjfKJ)_(2ldjwf;Qs;AAk2*(@F;233Abos'

interface Payload {
  [key: string]: any
}

export async function generateToken(payload: Payload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(JWT_SECRET))
}

export async function verifyToken(token: string): Promise<Payload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
    )
    console.log(`Payload ${payload}`)
    return payload as Payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}
