'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import PersonalDetailPage from '../../../../components/personal-detail-page'
import { toast } from 'sonner'
import { PersonalDetailTypedef } from '@/lib/typedef/personal-detail-typedef'
import IdentityVerification from '../../_components/verification'
import Review from '../../_components/review'

// Define steps with additional title and subtitle for each step
const steps = [
  {
    id: 1,
    name: 'Personal Details',
    title: 'Create Your Professional Account',
    subtitle: 'Let start with your personal information',
  },
  {
    id: 2,
    name: 'Verification Details',
    title: 'How Can We Reach You?',
    subtitle: 'Provide your preferred contact details.',
  },
  {
    id: 3,
    name: 'Review & Submit',
    title: 'Almost There!',
    subtitle: 'Review your information before submitting.',
  },
]

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1)

  // Form data state
  const [formData, setFormData] = useState<PersonalDetailTypedef>({
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
    image_base64: '',
    fingerprint_base64: '',
  })

  // Generic handler for input and select changes
  const handleChange = useCallback(
    (id: keyof PersonalDetailTypedef, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }))
    },
    [],
  )

  const validateStep1 = () => {
    const requiredFields: (keyof PersonalDetailTypedef)[] = [
      'surname',
      'name',
      'day',
      'month',
      'year',
      'gender',
      'status',
      'street',
      'houseNumber',
      'occupation',
      'nationality',
      'religion',
      'benefits',
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        let message = ''
        switch (field) {
          case 'surname':
            message =
              'Please enter your surname (family name). This is a required field.'
            break
          case 'name':
            message = 'Please enter your given name. This is a required field.'
            break
          case 'day':
          case 'month':
          case 'year':
            message =
              'Please select your complete date of birth. All parts (day, month, and year) are required.'
            break
          case 'gender':
            message =
              'Please select your gender from the provided options. This information is required.'
            break
          case 'status':
            message =
              'Please indicate your marital status. This information is necessary for our records.'
            break
          case 'street':
            message =
              'Please select your street from the dropdown list. This is part of your required address information.'
            break
          case 'houseNumber':
            message =
              'Please enter your house or apartment number. This completes your address information.'
            break
          case 'occupation':
            message =
              'Please select your current occupation from the list. This information is required for our records.'
            break
          case 'nationality':
            message =
              'Please select your nationality. This is a required piece of information for our database.'
            break
          case 'religion':
            message =
              'Please select your religion or belief system. While personal, this information is required for our records.'
            break
          case 'benefits':
            message =
              'Please select any applicable benefits. If none apply, please choose "None" from the list. This field is required.'
            break
          default:
            message = `The field "${field}" is required. Please provide this information to proceed.`
        }

        toast.error(message, {
          duration: 5000,
          position: 'bottom-right',
          style: {
            background: '#F3F4F6',
            color: '#111827',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '350px',
          },
        })
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 1) console.log('Form Data:', formData)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const currentStepDetails = steps[currentStep - 1]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailPage
            formData={formData}
            onFormDataChange={handleChange}
          />
        )
      case 2:
        return (
          <IdentityVerification
            formData={formData}
            onFormDataChange={handleChange}
          />
        )
      case 3:
        return <Review formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 md:p-12">
      <div className="mb-16">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            {currentStepDetails.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {currentStepDetails.subtitle}
          </p>

          {/* Stepper component */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step.id < currentStep
                          ? 'border-black bg-black text-white'
                          : step.id === currentStep
                            ? 'border-black text-black'
                            : 'border-gray-300 text-gray-300'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-xs font-medium text-gray-600">
                        {step.name}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-16 ${
                        step.id < currentStep ? 'bg-black' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {/* Current step content */}
        <div>{renderStepContent()}</div>
      </div>
      {/* Navigation buttons */}
      <div className="flex w-full items-center justify-center gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentStep === 1}
          variant="outline"
          className="bg-white text-gray-800 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default Stepper
