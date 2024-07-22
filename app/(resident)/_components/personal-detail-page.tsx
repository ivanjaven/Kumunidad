'use client'

import React from 'react'

import { CustomSelectField } from './custom-select-field'
import { CustomInputField } from './custom-input-field'
import { CustomFormField } from './custom-form-field'

import { SelectHelper } from '@/lib/static/select-helper'
import { YearHelper } from '@/lib/static/year-helper'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'

import { dummyData } from '@/lib/static/dummyData'

export default function PersonalDetailPage({
  formData,
  onFormDataChange,
}: {
  formData: PersonalDetailTypedef
  onFormDataChange: (id: keyof PersonalDetailTypedef, value: string) => void
}): JSX.Element {
  return (
    <section className="mt-8 space-y-8">
      {/* Name fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {['surname', 'name', 'middleName'].map((field) => (
          <CustomFormField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
            {CustomInputField(
              field as keyof PersonalDetailTypedef,
              `Enter ${field}`,
              'text',
              formData[field as keyof PersonalDetailTypedef],
              onFormDataChange,
            )}
          </CustomFormField>
        ))}
      </div>

      {/* Birthday, Gender, and Status fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Birthday">
          <div className="grid grid-cols-3 gap-4">
            {CustomSelectField(
              'day',
              SelectHelper.day,
              'Day',
              onFormDataChange,
              formData.day,
            )}
            {CustomSelectField(
              'month',
              SelectHelper.month,
              'Month',
              onFormDataChange,
              formData.month,
            )}
            {CustomSelectField(
              'year',
              YearHelper(1900, new Date().getFullYear()),
              'Year',
              onFormDataChange,
              formData.year,
            )}
          </div>
        </CustomFormField>
        <div className="space-y-4">
          <div className="flex gap-4">
            <CustomFormField label="Gender" className="flex-1">
              {CustomSelectField(
                'gender',
                SelectHelper.gender,
                'Select Gender',
                onFormDataChange,
                formData.gender,
              )}
            </CustomFormField>
            <CustomFormField label="Status" className="flex-1">
              {CustomSelectField(
                'status',
                SelectHelper.status,
                'Select Status',
                onFormDataChange,
                formData.status,
              )}
            </CustomFormField>
          </div>
        </div>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Street">
          {CustomSelectField(
            'street',
            dummyData.street,
            'Select Street',
            onFormDataChange,
            formData.street,
          )}
        </CustomFormField>
        <CustomFormField label="House Number">
          {CustomInputField(
            'houseNumber',
            'Enter House Number',
            'text',
            formData.houseNumber,
            onFormDataChange,
          )}
        </CustomFormField>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {['email', 'phone'].map((field) => (
          <CustomFormField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
            {CustomInputField(
              field as keyof PersonalDetailTypedef,
              `Enter ${field}`,
              field,
              formData[field as keyof PersonalDetailTypedef],
              onFormDataChange,
            )}
          </CustomFormField>
        ))}
      </div>

      {/* Additional information fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-8">
        {['occupation', 'nationality', 'religion', 'benefits'].map((field) => (
          <CustomFormField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
            {CustomSelectField(
              field as keyof PersonalDetailTypedef,
              dummyData[field as keyof typeof dummyData],
              `Select ${field}`,
              onFormDataChange,
              formData[field as keyof PersonalDetailTypedef],
            )}
          </CustomFormField>
        ))}
      </div>
    </section>
  )
}
