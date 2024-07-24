import React from 'react'
import { Input } from '@/components/ui/input'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'

export const CustomInputField: React.FC<{
  id: keyof RegistrationTypedef
  placeholder: string
  type: string
  cache: string
  handleChange: (id: keyof RegistrationTypedef, value: string) => void
}> = ({ id, placeholder, type, cache, handleChange }): JSX.Element => (
  <Input
    id={id}
    placeholder={placeholder}
    type={type}
    value={cache}
    onChange={(e) => handleChange(id, e.target.value)}
  />
)
