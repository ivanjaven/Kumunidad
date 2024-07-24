import React from 'react'
import { Input } from '@/components/ui/input'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'

export const CustomInputField: React.FC<{
  id: keyof PersonalDetailTypedef
  placeholder: string
  type: string
  cache: string
  handleChange: (id: keyof PersonalDetailTypedef, value: string) => void
}> = ({ id, placeholder, type, cache, handleChange }): JSX.Element => (
  <Input
    id={id}
    placeholder={placeholder}
    type={type}
    value={cache}
    onChange={(e) => handleChange(id, e.target.value)}
  />
)
