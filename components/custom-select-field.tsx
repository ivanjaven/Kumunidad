import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'

export const CustomSelectField: React.FC<{
  fieldId: keyof RegistrationTypedef
  selectPlaceholder: string
  selectOptions: Array<Record<string, any>>
  cache: string
  handleChange: (id: keyof RegistrationTypedef, value: string) => void
}> = ({
  fieldId,
  selectPlaceholder,
  selectOptions,
  cache,
  handleChange,
}): JSX.Element => (
  <Select onValueChange={(value) => handleChange(fieldId, value)} value={cache}>
    <SelectTrigger id={fieldId}>
      <SelectValue placeholder={selectPlaceholder} />
    </SelectTrigger>
    <SelectContent>
      {selectOptions.map((option) => (
        <SelectItem key={option.id} value={option.id.toString()}>
          {option.type || option.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
