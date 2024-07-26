'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/step-indicator'
import { PersonalDetail } from '@/components/personal-detail'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { VerificationDetail } from '@/components/verification-detail'
import { ReviewDetail } from '@/components/review-detail'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'
import { fetchMetadata } from '@/server/queries/fetch-metadata'
import { toast } from 'sonner'
import { postRegistration } from '@/server/actions/post-resident'
import Confetti from 'react-confetti'

export default function RegistrationPage() {
  const router = useRouter()
  const initialStep: 1 | 2 | 3 = 1
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep)
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

  const [metadata, setMetadata] = useState<MetadataTypedef>({
    benefits: [],
    occupation: [],
    street: [],
    nationality: [],
    religion: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  useEffect(() => {
    async function fetchOptions() {
      try {
        const data: MetadataTypedef = await fetchMetadata()
        setMetadata(data)
      } catch (error) {
        toast.error('Error fetching dropdown options. Please try again later.')
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
      toast(
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

  const handleNextOrSubmit = useCallback(async () => {
    if (validateStep()) {
      if (currentStep === REGISTRATION_CONFIG.steps.length) {
        setIsSubmitting(true)
        try {
          const result = await postRegistration(formData)
          console.log('Registration successful:', result)
          toast.success('Registration submitted successfully!')
          setIsSuccessful(true)
        } catch (error) {
          console.error('Registration failed:', error)
          toast.error('Registration failed. Please try again.')
        } finally {
          setIsSubmitting(false)
        }
      } else {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) as 1 | 2 | 3
          return nextStep <= REGISTRATION_CONFIG.steps.length ? nextStep : prev
        })
      }
    }
  }, [currentStep, validateStep, formData])

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => {
      const prevStep = (prev - 1) as 1 | 2 | 3
      return prevStep >= 1 ? prevStep : prev
    })
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
      3: <ReviewDetail metadata={metadata} formData={formData} />,
    }
    return stepComponents[currentStep] || null
  }, [currentStep, metadata, formData, handleChange])

  const isLastStep = currentStep === REGISTRATION_CONFIG.steps.length

  return (
    <main className="w-full md:p-8">
      {isSuccessful && <Confetti recycle={false} />}
      <section className="mb-16">
        <header className="space-y-4 text-center">
          <h1 className="font-bold text-black sm:text-5xl">
            {isSuccessful ? 'Congratulations' : currentStepDetails.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {isSuccessful
              ? 'Thank you for registration.'
              : currentStepDetails.subtitle}
          </p>
          {!isSuccessful && (
            <StepIndicator
              steps={REGISTRATION_CONFIG.steps}
              currentStep={currentStep}
            />
          )}
        </header>
        <article>{renderStepContent}</article>
      </section>
      <nav className="flex w-full items-center justify-center gap-4">
        {isSuccessful ? (
          <Button
            onClick={() => router.push('/home')}
            className="hover:bg-primary-700 dark:hover:bg-primary-700 bg-primary text-primary-foreground transition-colors dark:bg-primary dark:text-primary-foreground"
          >
            Go Home
          </Button>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </main>
  )
}
