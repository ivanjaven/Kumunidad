'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/step-indicator'
import { PersonalDetail } from '@/components/personal-detail'
import { VerificationDetail } from '@/components/verification-detail'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { ReviewDetail } from '@/components/review-detail'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'
import { fetchMetadata } from '@/server/queries/fetch-metadata'
import { insertResident } from '@/server/actions/insert-resident'
import { toast } from 'sonner'
import Confetti from 'react-confetti'

const initialFormData: RegistrationTypedef = {
  benefits: '',
  day: '',
  email: '',
  fingerprint_base64: '',
  gender: '',
  houseNumber: '',
  image_base64: '',
  middlename: '',
  mobile: '',
  month: '',
  name: '',
  nationality: '',
  occupation: '',
  religion: '',
  status: '',
  street: '',
  surname: '',
  year: '',
}

const initialMetadata: MetadataTypedef = {
  benefits: [],
  occupation: [],
  street: [],
  nationality: [],
  religion: [],
}

export default function RegistrationPage() {
  const router = useRouter()
  const initialStep: 1 | 2 | 3 = 1
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep)
  const [formData, setFormData] = useState<RegistrationTypedef>(initialFormData)
  const [metadata, setMetadata] = useState<MetadataTypedef>(initialMetadata)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchMetadata()
        setMetadata(data)
      } catch (error) {
        toast.error(
          'Error fetching dropdown options. Please try again later.',
          {
            description: new Date().toLocaleString(),
            action: { label: 'Undo', onClick: () => console.log('Undo') },
          },
        )
      }
    }

    fetchOptions()
  }, [])

  const handleChange = useCallback(
    (id: keyof RegistrationTypedef, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }))
    },
    [],
  )

  const validateStep = useCallback(() => {
    const requiredFields = REGISTRATION_CONFIG.requiredFields[currentStep]
    const emptyField = requiredFields.find(
      (field) => !formData[field as keyof RegistrationTypedef],
    )

    if (emptyField) {
      toast.error(
        REGISTRATION_CONFIG.errorMessages[
          emptyField as keyof typeof REGISTRATION_CONFIG.errorMessages
        ],
        {
          description: new Date().toLocaleString(),
          action: { label: 'Undo', onClick: () => console.log('Undo') },
        },
      )
      return false
    }
    return true
  }, [formData, currentStep])

  const handleSubmitSuccess = useCallback(() => {
    setIsSuccessful(true)
    toast.success('Registration submitted successfully!')
  }, [])

  const handleNextOrSubmit = useCallback(async () => {
    if (validateStep()) {
      if (currentStep === REGISTRATION_CONFIG.steps.length) {
        setIsSubmitting(true)
        try {
          await insertResident(formData)
          handleSubmitSuccess()
        } catch (error) {
          console.error('Registration failed:', error)
          toast.error('Registration failed. Please try again', {
            description: new Date().toLocaleString(),
            action: { label: 'Undo', onClick: () => console.log('Undo') },
          })
        } finally {
          setIsSubmitting(false)
        }
      } else {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)
      }
    }
  }, [currentStep, validateStep, formData, handleSubmitSuccess])

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev))
  }, [])

  const currentStepDetails = useMemo(
    () => REGISTRATION_CONFIG.steps[currentStep - 1],
    [currentStep],
  )

  const renderStepContent = useMemo(() => {
    const stepComponents = {
      1: (
        <PersonalDetail
          metadata={metadata}
          formData={formData}
          onFormDataChange={handleChange}
        />
      ),
      2: (
        <VerificationDetail
          formData={formData}
          onFormDataChange={handleChange}
        />
      ),
      3: (
        <div className="mt-24">
          <ReviewDetail metadata={metadata} formData={formData} />
        </div>
      ),
    }
    return stepComponents[currentStep] || null
  }, [currentStep, metadata, formData, handleChange])

  const isLastStep = currentStep === REGISTRATION_CONFIG.steps.length

  const renderSuccessView = useCallback(
    () => (
      <>
        <Confetti recycle={false} />
        <div className="mt-16">
          <section className="mb-24">
            <header className="space-y-4 text-center">
              <h1 className="font-bold text-black sm:text-5xl">
                {REGISTRATION_CONFIG.successMessages.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {REGISTRATION_CONFIG.successMessages.subtitle}
              </p>
            </header>
            <div className="mt-16">
              <ReviewDetail metadata={metadata} formData={formData} />
            </div>
          </section>
          <nav className="flex w-full items-center justify-center gap-4">
            <Button
              onClick={() => router.push('/home')}
              className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
            >
              Go Home
            </Button>
          </nav>
        </div>
      </>
    ),
    [metadata, formData, router],
  )

  return (
    <main className="w-full md:p-8">
      {isSuccessful ? (
        renderSuccessView()
      ) : (
        <>
          <section className="mb-16">
            <header className="space-y-4 text-center">
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
            </header>
            <article>{renderStepContent}</article>
          </section>
          <nav className="flex w-full items-center justify-center gap-4">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 1}
              aria-disabled={currentStep === 1}
              variant="outline"
              className="bg-white text-gray-800 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextOrSubmit}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              aria-label={isLastStep ? 'Submit form' : 'Next step'}
              className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
            >
              {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Next'}
            </Button>
          </nav>
        </>
      )}
    </main>
  )
}
