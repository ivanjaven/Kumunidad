import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function gy(): { id: string; type: string }[] {
  const currentYear = new Date().getFullYear()
  const startYear = 1900

  return Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
    const year = (startYear + index).toString()
    return { id: year, type: year }
  }).reverse()
}

// Helper function to capitalize the first letter of a string
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
