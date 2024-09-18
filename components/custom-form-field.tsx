import React from 'react'
import { Label } from '@/components/ui/label'

export const CustomFormField: React.FC<{
  label: string
  children: React.ReactNode
  className?: string
}> = ({ label, children, className = '' }): JSX.Element => (
  <div className={`space-y-4 ${className}`}>
    <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </Label>
    {children}
  </div>
)
