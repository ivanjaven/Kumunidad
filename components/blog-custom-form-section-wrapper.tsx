import React from 'react'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BlogCustomFormSection } from './blog-custom-form-section'

interface BlogCustomFormSectionProps {
  officials: BlogTypedef[]
  kagawads: BlogTypedef[]
  lupons: BlogTypedef[]
  skOfficials: BlogTypedef[]
  skKagawads: BlogTypedef[]
  tanods: BlogTypedef[]
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setLupons: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setTanods: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  title: string
  sectionKey: string
  infoText: string
}

export const BlogCustomFormSectionWrapper: React.FC<
  BlogCustomFormSectionProps
> = ({
  officials,
  kagawads,
  lupons,
  skOfficials,
  skKagawads,
  tanods,
  setOfficials,
  setKagawads,
  setLupons,
  setSkOfficials,
  setSkKagawads,
  setTanods,
  title,
  sectionKey,
  infoText,
}) => {
  let officialsToRender: BlogTypedef[] = []
  let setOfficialsFn: React.Dispatch<
    React.SetStateAction<BlogTypedef[]>
  > | null = null
  let addNewRole: Role | null = null

  switch (sectionKey) {
    case 'EXECUTIVE':
      officialsToRender = officials
      setOfficialsFn = setOfficials
      break
    case 'BARANGAY_KAGAWAD':
      officialsToRender = kagawads
      setOfficialsFn = setKagawads
      addNewRole = 'Barangay Kagawad'
      break
    case 'LUPONG_TAGAPAMAYAPA':
      officialsToRender = lupons
      setOfficialsFn = setLupons
      addNewRole = 'Lupong Tagapamayapa'
      break
    case 'SK_EXECUTIVE':
      officialsToRender = skOfficials
      setOfficialsFn = setSkOfficials
      break
    case 'SK_KAGAWAD':
      officialsToRender = skKagawads
      setOfficialsFn = setSkKagawads
      addNewRole = 'SK Kagawad'
      break
    case 'BARANGAY_TANOD':
      officialsToRender = tanods
      setOfficialsFn = setTanods
      addNewRole = 'Barangay Tanod'
      break
  }

  return (
    <BlogCustomFormSection
      title={title}
      infoText={infoText}
      officials={officialsToRender}
      setOfficials={setOfficialsFn}
      addNewRole={addNewRole}
    />
  )
}
