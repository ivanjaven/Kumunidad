// Import the bcryptjs library for password hashing
import bcrypt from 'bcryptjs'

/**
 * Hashes a password using bcrypt.
 * @param password The plain text password to hash.
 * @returns A Promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  // Set the number of salt rounds for bcrypt
  // Higher values make the hash more secure but slower to compute
  const saltRounds = 10

  // Use bcrypt to hash the password
  // This function automatically generates a salt and combines it with the hash
  return bcrypt.hash(password, saltRounds)
}

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password to check.
 * @param hash The hashed password to compare against.
 * @returns A Promise that resolves to true if the password matches, false otherwise.
 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  // Use bcrypt to compare the plain text password with the hash
  // This function extracts the salt from the hash and uses it to hash the plain text password
  // It then compares the resulting hash with the stored hash
  return bcrypt.compare(password, hash)
}
