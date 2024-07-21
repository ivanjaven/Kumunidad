'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import PersonalDetailPage from './registration'

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

const Step2Content = () => <div>Contact Information Content</div>
const Step3Content = () => <div>Review & Submit Content</div>

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleNext = () => {
    if (currentStep === 1) {
      console.log('Form Data:', formData)
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const currentStepDetails = steps[currentStep - 1]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailPage onFormDataChange={setFormData} />
      case 2:
        return <Step2Content />
      case 3:
        return <Step3Content />
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
