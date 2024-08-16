import React from 'react'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { OfficialCard } from './OfficialCard'
import { AddNewCard } from './AddNewCard'

interface OfficialSectionProps {
  title: string
  infoText: string
  officials: BlogTypedef[]
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>> | null
  addNewRole: Role | null
}

export function OfficialSection({
  title,
  infoText,
  officials,
  setOfficials,
  addNewRole,
}: OfficialSectionProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="mb-6 text-gray-700">
        <p className="text-sm">{infoText}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {officials.map((official, index) => (
          <OfficialCard
            key={`${official.role}-${index}`}
            official={official}
            index={index}
            setOfficials={setOfficials!}
          />
        ))}
        {addNewRole && setOfficials && (
          <AddNewCard role={addNewRole} setOfficials={setOfficials} />
        )}
      </div>
    </div>
  )
}
