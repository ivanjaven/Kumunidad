'use client'

import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from '@/components/ui/context-menu'
import { FingerprintIcon, UploadIcon, XIcon } from '@/lib/icons'

interface FormData {
  surname: string
  name: string
  middleName: string
  day: string
  month: string
  year: string
  gender: string
  status: string
  street: string
  houseNumber: string
  email: string
  phone: string
  occupation: string
  nationality: string
  religion: string
  benefits: string
}

const generateYearOptions = (startYear: number, endYear: number): number[] =>
  Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index,
  ).reverse()

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

const UploadField: React.FC<{ label: string; icon: React.ReactNode }> = ({
  label,
  icon,
}) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative h-40 w-40 overflow-hidden rounded-lg">
      <Image
        alt={`Uploaded ${label}`}
        src="/placeholder.svg"
        layout="fill"
        objectFit="cover"
      />
      <Button className="absolute right-0 top-0" size="icon" variant="ghost">
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-200">
        {icon}
        <span className="text-base font-medium">Upload {label}</span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuItem>
          <Input
            className="hidden"
            id={`${label.toLowerCase()}-upload`}
            type="file"
          />
          <span className="text-base">Upload from device</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <span className="text-base">
            {label === 'Photo' ? 'Take a photo' : 'Scan fingerprint'}
          </span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
)

export default function RegistrationForm(): JSX.Element {
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

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }, [])

  const handleSelectChange = useCallback(
    (id: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }))
    },
    [],
  )

  const handleCreateAccount = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('Form Data:', formData)
      // TODO: Implement account creation logic
    },
    [formData],
  )

  const handleResetForm = useCallback(() => {
    setFormData({
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
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 md:p-12">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Create Your Professional Account
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Fill out the form to get started.
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleCreateAccount}>
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
                  onChange={handleInputChange}
                />
              </FormField>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <FormField label="Birthday">
              <div className="grid grid-cols-3 gap-4">
                <Select
                  onValueChange={(value) => handleSelectChange('day', value)}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(31)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => handleSelectChange('month', value)}
                >
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ].map((month, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => handleSelectChange('year', value)}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYearOptions(1900, new Date().getFullYear()).map(
                      (year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </FormField>

            <div className="space-y-4">
              <div className="flex gap-4">
                <FormField label="Gender" className="flex-1">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('gender', value)
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Male', 'Female', 'Other'].map((option) => (
                        <SelectItem key={option} value={option.toLowerCase()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Status" className="flex-1">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('status', value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Single', 'Married', 'Divorced', 'Widowed'].map(
                        (option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <FormField label="Street">
              <Select
                onValueChange={(value) => handleSelectChange('street', value)}
              >
                <SelectTrigger id="street">
                  <SelectValue placeholder="Select Street" />
                </SelectTrigger>
                <SelectContent>
                  {['Street 1', 'Street 2', 'Street 3'].map((street, i) => (
                    <SelectItem key={i} value={`street${i + 1}`}>
                      {street}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="House Number">
              <Input
                id="houseNumber"
                placeholder="Enter House Number"
                required
                value={formData.houseNumber}
                onChange={handleInputChange}
              />
            </FormField>
          </div>

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
                  onChange={handleInputChange}
                />
              </FormField>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-8">
            {[
              {
                field: 'occupation',
                options: [
                  'Student',
                  'Employee',
                  'Self-Employed',
                  'Retired',
                  'Unemployed',
                ],
              },
              {
                field: 'nationality',
                options: [
                  'USA',
                  'Canada',
                  'United Kingdom',
                  'Australia',
                  'Other',
                ],
              },
              {
                field: 'religion',
                options: ['Christian', 'Muslim', 'Hindu', 'Buddhist', 'Other'],
              },
              {
                field: 'benefits',
                options: [
                  'Health Insurance',
                  'Dental Insurance',
                  'Vision Insurance',
                  'Retirement Plan',
                  'None',
                ],
              },
            ].map(({ field, options }) => (
              <FormField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
              >
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(field as keyof FormData, value)
                  }
                >
                  <SelectTrigger id={field}>
                    <SelectValue placeholder={`Select ${field}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toLowerCase().replace(' ', '-')}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <UploadField
              label="Photo"
              icon={<UploadIcon className="h-6 w-6" />}
            />
            <UploadField
              label="Fingerprint"
              icon={<FingerprintIcon className="h-6 w-6" />}
            />
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-white text-gray-800 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={handleResetForm}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
