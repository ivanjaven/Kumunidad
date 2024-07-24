'use client'

import React from 'react'

import { SelectHelper } from '@/lib/static/select-helper'
import { YearHelper } from '@/lib/static/year-helper'
import { dummyData } from '@/lib/static/dummyData'

import { CustomSelectField } from '@/components/custom-select-field'
import { CustomInputField } from '@/components/custom-input-field'
import { CustomFormField } from '@/components/custom-form-field'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'

type PersonalDetailPageProps = {
  formData: PersonalDetailTypedef
  onFormDataChange: (id: keyof PersonalDetailTypedef, value: string) => void
}

export default function PersonalDetailPage({
  formData,
  onFormDataChange,
}: PersonalDetailPageProps): JSX.Element {
  return (
    <section className="mt-8 space-y-8">
      {/* Name fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {['surname', 'name', 'middleName'].map((field) => (
          <CustomFormField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
            <CustomInputField
              id={field as keyof PersonalDetailTypedef}
              placeholder={`Enter ${field}`}
              type="text"
              cache={formData[field as keyof PersonalDetailTypedef]}
              handleChange={onFormDataChange}
            />
          </CustomFormField>
        ))}
      </div>

      {/* Birthday, Gender, and Status fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Birthday">
          <div className="grid grid-cols-3 gap-4">
            <CustomSelectField
              fieldId="day"
              selectPlaceholder="Day"
              selectOptions={SelectHelper.day}
              cache={formData.day}
              handleChange={onFormDataChange}
            />
            <CustomSelectField
              fieldId="month"
              selectPlaceholder="Month"
              selectOptions={SelectHelper.month}
              cache={formData.month}
              handleChange={onFormDataChange}
            />
            <CustomSelectField
              fieldId="year"
              selectPlaceholder="Year"
              selectOptions={YearHelper(1900, new Date().getFullYear())}
              cache={formData.year}
              handleChange={onFormDataChange}
            />
          </div>
        </CustomFormField>
        <div className="space-y-4">
          <div className="flex gap-4">
            <CustomFormField label="Gender" className="flex-1">
              <CustomSelectField
                fieldId="gender"
                selectPlaceholder="Select Gender"
                selectOptions={SelectHelper.gender}
                cache={formData.gender}
                handleChange={onFormDataChange}
              />
            </CustomFormField>
            <CustomFormField label="Status" className="flex-1">
              <CustomSelectField
                fieldId="status"
                selectPlaceholder="Select Status"
                selectOptions={SelectHelper.status}
                cache={formData.status}
                handleChange={onFormDataChange}
              />
            </CustomFormField>
          </div>
        </div>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Street">
          <CustomSelectField
            fieldId="street"
            selectPlaceholder="Select Street"
            selectOptions={dummyData.street}
            cache={formData.street}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
        <CustomFormField label="House Number">
          <CustomInputField
            id="houseNumber"
            placeholder="Enter House Number"
            type="text"
            cache={formData.houseNumber}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {['email', 'phone'].map((field) => (
          <CustomFormField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
            <CustomInputField
              id={field as keyof PersonalDetailTypedef}
              placeholder={`Enter ${field}`}
              type={field === 'email' ? 'email' : 'number'}
              cache={formData[field as keyof PersonalDetailTypedef]}
              handleChange={onFormDataChange}
            />
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
            <CustomSelectField
              fieldId={field as keyof PersonalDetailTypedef}
              selectPlaceholder={`Select ${field}`}
              selectOptions={dummyData[field as keyof typeof dummyData]}
              cache={formData[field as keyof PersonalDetailTypedef]}
              handleChange={onFormDataChange}
            />
          </CustomFormField>
        ))}
      </div>
    </section>
  )
}
