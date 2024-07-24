'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { StepIndicator } from '@/components/step-indicator'
import { PersonalDetail } from '@/components/personal-detail'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import IdentityVerification from '../../_components/verification'
import Review from '../../_components/review'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'

type StepId = 1 | 2 | 3

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(1)
  const [formData, setFormData] = useState<RegistrationTypedef>({
    benefits: '',
    day: '',
    email: '',
    fingerprint_base64: '',
    gender: '',
    houseNumber: '',
    image_base64: '',
    middleName: '',
    month: '',
    name: '',
    nationality: '',
    occupation: '',
    phone: '',
    religion: '',
    status: '',
    street: '',
    surname: '',
    year: '',
  })

  const handleChange = useCallback(
    (id: keyof RegistrationTypedef, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }))
    },
    [],
  )

  const validateStep = useCallback(() => {
    const requiredFields = REGISTRATION_CONFIG.requiredFields[currentStep]
    for (const field of requiredFields) {
      if (!formData[field as keyof RegistrationTypedef]) {
        toast(
          REGISTRATION_CONFIG.errorMessages[
            field as keyof typeof REGISTRATION_CONFIG.errorMessages
          ],
          {
            description: new Date().toLocaleString(),
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          },
        )
        return false
      }
    }
    return true
  }, [formData, currentStep])

  const handleNext = useCallback(() => {
    if (!validateStep()) return
    if (currentStep === 1) console.log('Form Data:', formData)
    setCurrentStep(
      (prev) => Math.min(prev + 1, REGISTRATION_CONFIG.steps.length) as StepId,
    )
  }, [currentStep, validateStep, formData])

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as StepId)
  }, [])

  const currentStepDetails = useMemo(
    () => REGISTRATION_CONFIG.steps[currentStep - 1],
    [currentStep],
  )

  const renderStepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetail formData={formData} onFormDataChange={handleChange} />
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
  }, [currentStep, formData, handleChange])

  return (
    <div className="w-full md:p-8">
      <div className="mb-16">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-black sm:text-5xl">
            {currentStepDetails.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {currentStepDetails.subtitle}
          </p>
          <StepIndicator
            steps={REGISTRATION_CONFIG.steps}
            currentStep={currentStep}
          />
        </div>
        <div>{renderStepContent}</div>
      </div>
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
          disabled={currentStep === REGISTRATION_CONFIG.steps.length}
          className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
        >
          {currentStep === REGISTRATION_CONFIG.steps.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default Stepper
