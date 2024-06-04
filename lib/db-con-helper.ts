import mysql from 'mysql2/promise'

interface QueryParams {
  query: string
  values?: (string | number | boolean | null)[]
}

export async function Query({ query, values = [] }: QueryParams): Promise<any> {
  const dbconnection = await mysql.createConnection({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: Number(process.env.NEXT_PUBLIC_DB_PORT),
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB_NAME,
  })

  try {
    const [results] = await dbconnection.execute(query, values)
    dbconnection.end()
    return results
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred')
  }
}
