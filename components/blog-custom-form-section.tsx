import React from 'react'
import { XIcon } from 'lucide-react'
import { BlogFormField } from '@/components/blog-form-field'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BlogAddCard } from '@/components/blog-add-card'

interface BlogFormSectionProps {
  title: string
  infoText: string
  officials: BlogTypedef[]
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>> | null
  addNewRole: Role | null
  sectionKey: string
}

export function BlogFormSection({
  title,
  infoText,
  officials,
  setOfficials,
  addNewRole,
  sectionKey,
}: BlogFormSectionProps) {
  const removeOfficial = (index: number) => {
    setOfficials?.((prev) => prev.filter((_, i) => i !== index))
  }

  const isExecutiveSection =
    sectionKey === 'EXECUTIVE' || sectionKey === 'SK_EXECUTIVE'

  const rolesWithoutRemoveButton = [
    'Punong Barangay',
    'Barangay Secretary',
    'Barangay Treasurer',
    'SK Chairperson',
    'SK Secretary',
    'SK Treasurer',
  ]

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="mb-6 text-gray-700">
        <p className="text-sm">{infoText}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {officials.map((official, index) => (
          <div key={`${official.role}-${index}`} className="relative">
            <BlogFormField
              official={official}
              index={index}
              setOfficials={setOfficials!}
            />
            {!isExecutiveSection &&
              index !== 0 &&
              !rolesWithoutRemoveButton.includes(official.role) &&
              setOfficials && (
                <button
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  onClick={() => removeOfficial(index)}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
          </div>
        ))}
        {addNewRole && setOfficials && (
          <BlogAddCard role={addNewRole} setOfficials={setOfficials} />
        )}
      </div>
    </div>
  )
}
