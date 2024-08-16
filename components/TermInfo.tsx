import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'

interface TermInfoProps {
  startYear: string
  endYear: string
  termsAccepted: boolean
  setStartYear: React.Dispatch<React.SetStateAction<string>>
  setEndYear: React.Dispatch<React.SetStateAction<string>>
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
}

export function TermInfo({
  startYear,
  endYear,
  termsAccepted,
  setStartYear,
  setEndYear,
  setTermsAccepted,
}: TermInfoProps) {
  return (
    <div className="mb-8 flex flex-col gap-8">
      <div className="w-full">
        <p className="mb-6 text-gray-700">{BLOG_CONFIG.TERM_INFO_TEXT}</p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/2">
          <Label
            htmlFor="startYear"
            className="text-sm font-medium text-gray-900"
          >
            Starting Year
          </Label>
          <Input
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="Enter starting year"
            className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label
            htmlFor="endYear"
            className="text-sm font-medium text-gray-900"
          >
            Ending Year
          </Label>
          <Input
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="Enter ending year"
            className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <Checkbox
          id="terms"
          className="mr-2"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
        />
        <Label
          htmlFor="terms"
          className="flex items-center space-x-1 text-sm font-medium text-gray-700"
        >
          <span>{BLOG_CONFIG.TERMS_AND_CONDITIONS.TEXT}</span>
          <HoverCard>
            <HoverCardTrigger>
              <p className="cursor-pointer text-blue-500 underline">
                {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <h3 className="text-lg font-semibold">
                {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {BLOG_CONFIG.TERMS_AND_CONDITIONS.CONTENT}
              </p>
            </HoverCardContent>
          </HoverCard>
        </Label>
      </div>
    </div>
  )
}
