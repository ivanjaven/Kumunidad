import React from 'react'
import { Check } from 'lucide-react'
import clsx from 'clsx'

interface StepIndicatorProps {
  steps: {
    id: number
    name: string
  }[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2',
                  {
                    'border-black bg-black text-white': step.id < currentStep,
                    'border-black text-black': step.id === currentStep,
                    'border-gray-300 text-gray-300': step.id > currentStep,
                  },
                )}
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
                className={clsx('mx-2 h-0.5 w-16', {
                  'bg-black': step.id < currentStep,
                  'bg-gray-300': step.id >= currentStep,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
