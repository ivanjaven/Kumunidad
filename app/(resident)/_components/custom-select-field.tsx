import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'

/**
 * Renders a select field component.
 *
 * @param {keyof PersonalDetailTypedef} fieldId - The identifier for the select field.
 * @param {Array<Record<string, any>>} selectOptions - The options to be displayed in the select field.
 * @param {string} selectPlaceholder - The placeholder text for the select field.
 * @param {Function} handleChange - Function to handle the value change event.
 * @param {string} currentValue - The current value of the select field.
 * @returns {JSX.Element} - The rendered select field component.
 */
export const CustomSelectField = (
  fieldId: keyof PersonalDetailTypedef,
  selectOptions: Array<Record<string, any>>,
  selectPlaceholder: string,
  handleChange: (id: keyof PersonalDetailTypedef, value: string) => void,
  currentValue: string,
): JSX.Element => (
  <Select
    onValueChange={(value) => handleChange(fieldId, value)}
    value={currentValue}
  >
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
