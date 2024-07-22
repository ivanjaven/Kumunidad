import React from 'react'
import { Input } from '@/components/ui/input'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'

/**
 * Render an input field component.
 *
 * @param {keyof PersonalDetailTypedef} id - The identifier for the input field, corresponding to a property of the PersonalDetailTypedef.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} type - The type of the input field (e.g., 'text', 'email', 'number').
 * @param {string} value - The current value of the input field.
 * @param {(id: keyof PersonalDetailTypedef, value: string) => void} handleChange - The callback function to handle changes to the input field.
 *  It receives the field id and the new value as arguments.
 *
 * @returns {JSX.Element} The rendered input field component.
 */
export const CustomInputField = (
  id: keyof PersonalDetailTypedef,
  placeholder: string,
  type: string,
  value: string,
  handleChange: (id: keyof PersonalDetailTypedef, value: string) => void,
): JSX.Element => (
  <Input
    id={id}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(id, e.target.value)}
  />
)
