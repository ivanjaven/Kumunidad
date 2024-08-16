import React, { useCallback } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { OfficialSection } from './OfficialSection'
import { TermInfo } from './TermInfo'
import { useBarangayOfficialForm } from '@/lib/hooks/useBarangayOfficialForm'

interface BarangayOfficialFormProps {
  officials: BlogTypedef[]
  kagawads: BlogTypedef[]
  lupons: BlogTypedef[]
  tanods: BlogTypedef[]
  skOfficials: BlogTypedef[]
  skKagawads: BlogTypedef[]
  startYear: string
  endYear: string
  termsAccepted: boolean
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setLupons: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setTanods: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setStartYear: React.Dispatch<React.SetStateAction<string>>
  setEndYear: React.Dispatch<React.SetStateAction<string>>
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
  closeDialog: () => void
}

export function BarangayOfficialForm({
  officials,
  kagawads,
  lupons,
  tanods,
  skOfficials,
  skKagawads,
  startYear,
  endYear,
  termsAccepted,
  setOfficials,
  setKagawads,
  setLupons,
  setTanods,
  setSkOfficials,
  setSkKagawads,
  setStartYear,
  setEndYear,
  setTermsAccepted,
  closeDialog,
}: BarangayOfficialFormProps) {
  const { handleSubmit, handleClear } = useBarangayOfficialForm({
    officials,
    kagawads,
    lupons,
    tanods,
    skOfficials,
    skKagawads,
    startYear,
    endYear,
    termsAccepted,
    setOfficials,
    setKagawads,
    setLupons,
    setTanods,
    setSkOfficials,
    setSkKagawads,
    setStartYear,
    setEndYear,
    setTermsAccepted,
    closeDialog,
  })

  const renderSection = useCallback(
    (title: string, key: string, infoText: string) => {
      let officialsToRender: BlogTypedef[] = []
      let setOfficials: React.Dispatch<
        React.SetStateAction<BlogTypedef[]>
      > | null = null
      let addNewRole: Role | null = null

      switch (key) {
        case 'EXECUTIVE':
          officialsToRender = officials
          setOfficials = setOfficials
          break
        case 'BARANGAY_KAGAWAD':
          officialsToRender = kagawads
          setOfficials = setKagawads
          addNewRole = 'Barangay Kagawad'
          break
        case 'LUPONG_TAGAPAMAYAPA':
          officialsToRender = lupons
          setOfficials = setLupons
          addNewRole = 'Lupong Tagapamayapa'
          break
        case 'SK_EXECUTIVE':
          officialsToRender = skOfficials
          setOfficials = setSkOfficials
          break
        case 'SK_KAGAWAD':
          officialsToRender = skKagawads
          setOfficials = setSkKagawads
          addNewRole = 'SK Kagawad'
          break
        case 'BARANGAY_TANOD':
          officialsToRender = tanods
          setOfficials = setTanods
          addNewRole = 'Barangay Tanod'
          break
      }

      return (
        <OfficialSection
          key={key}
          title={title}
          infoText={infoText}
          officials={officialsToRender}
          setOfficials={setOfficials}
          addNewRole={addNewRole}
        />
      )
    },
    [
      officials,
      kagawads,
      lupons,
      skOfficials,
      skKagawads,
      tanods,
      setKagawads,
      setLupons,
      setSkOfficials,
      setSkKagawads,
      setTanods,
    ],
  )

  return (
    <div className="max-h-[70vh] overflow-y-auto p-6">
      <div className="space-y-12">
        {BLOG_CONFIG.SECTIONS.map((section, index) => (
          <div key={section.key}>
            {renderSection(section.title, section.key, section.infoText)}
            {index < BLOG_CONFIG.SECTIONS.length - 1 && (
              <Separator className="my-12" />
            )}
          </div>
        ))}
      </div>
      <Separator className="my-12" />
      <TermInfo
        startYear={startYear}
        endYear={endYear}
        termsAccepted={termsAccepted}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
        setTermsAccepted={setTermsAccepted}
      />
      <div className="flex justify-end gap-4 p-6">
        <Button variant="outline" onClick={handleClear}>
          Reset
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  )
}
