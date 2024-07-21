'use client'

import React, { useState, useCallback } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { YearHelper } from '@/lib/static/year-helper'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { dummyData } from './dummyData'
import { SelectHelper } from '@/lib/static/select-helper'
import { FormData } from '@/lib/typedef/data-form-typedef'

// FormField component for consistent form field rendering
const FormField: React.FC<{
  label: string
  children: React.ReactNode
  className?: string
}> = ({ label, children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </Label>
    {children}
  </div>
)

// Main PersonalDetailPage component
export default function PersonalDetailPage({
  onFormDataChange,
}: {
  onFormDataChange: (data: FormData) => void
}): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    surname: '',
    name: '',
    middleName: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    status: '',
    street: '',
    houseNumber: '',
    email: '',
    phone: '',
    occupation: '',
    nationality: '',
    religion: '',
    benefits: '',
  })

  // Generic handler for input and select changes
  const handleChange = useCallback(
    (id: keyof FormData, value: string) => {
      setFormData((prev) => {
        const newData = { ...prev, [id]: value }
        onFormDataChange(newData)
        return newData
      })
    },
    [onFormDataChange],
  )

  // Render select field
  const renderSelect = (
    id: keyof FormData,
    options: any[],
    placeholder: string,
  ) => (
    <Select onValueChange={(value) => handleChange(id, value)}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id.toString()}>
            {option.type || option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return (
    <div>
      <form className="mt-8 space-y-8">
        {/* Name fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {['surname', 'name', 'middleName'].map((field) => (
            <FormField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
            >
              <Input
                id={field}
                placeholder={`Enter ${field}`}
                required={field !== 'middleName'}
                value={formData[field as keyof FormData]}
                onChange={(e) =>
                  handleChange(field as keyof FormData, e.target.value)
                }
              />
            </FormField>
          ))}
        </div>

        {/* Birthday, Gender, and Status fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <FormField label="Birthday">
            <div className="grid grid-cols-3 gap-4">
              {renderSelect('day', SelectHelper.day, 'Day')}
              {renderSelect('month', SelectHelper.month, 'Month')}
              {renderSelect(
                'year',
                YearHelper(1900, new Date().getFullYear()),
                'Year',
              )}
            </div>
          </FormField>
          <div className="space-y-4">
            <div className="flex gap-4">
              <FormField label="Gender" className="flex-1">
                {renderSelect('gender', SelectHelper.gender, 'Select Gender')}
              </FormField>
              <FormField label="Status" className="flex-1">
                {renderSelect('status', SelectHelper.status, 'Select Status')}
              </FormField>
            </div>
          </div>
        </div>

        {/* Address fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <FormField label="Street">
            {renderSelect('street', dummyData.street, 'Select Street')}
          </FormField>
          <FormField label="House Number">
            <Input
              id="houseNumber"
              placeholder="Enter House Number"
              required
              value={formData.houseNumber}
              onChange={(e) => handleChange('houseNumber', e.target.value)}
            />
          </FormField>
        </div>

        {/* Contact fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {['email', 'phone'].map((field) => (
            <FormField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
            >
              <Input
                id={field}
                placeholder={`Enter ${field}`}
                required
                type={field}
                value={formData[field as keyof FormData]}
                onChange={(e) =>
                  handleChange(field as keyof FormData, e.target.value)
                }
              />
            </FormField>
          ))}
        </div>

        {/* Additional information fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-8">
          {['occupation', 'nationality', 'religion', 'benefits'].map(
            (field) => (
              <FormField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
              >
                {renderSelect(
                  field as keyof FormData,
                  dummyData[field as keyof typeof dummyData],
                  `Select ${field}`,
                )}
              </FormField>
            ),
          )}
        </div>
      </form>
    </div>
  )
}
