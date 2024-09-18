import { useState } from 'react'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'

export function useDialogHooks() {
  const [officials, setOfficials] = useState<BlogTypedef[]>(() =>
    BLOG_CONFIG.OFFICIALS.EXECUTIVE.map((official) => ({
      role: official.role as Role,
      name: official.name,
      image: official.image,
    })),
  )
  const [kagawads, setKagawads] = useState<BlogTypedef[]>(() => [
    { role: 'Barangay Kagawad' as Role, name: '', image: null },
  ])
  const [lupons, setLupons] = useState<BlogTypedef[]>(() => [
    { role: 'Lupong Tagapamayapa' as Role, name: '', image: null },
  ])
  const [tanods, setTanods] = useState<BlogTypedef[]>(() => [
    { role: 'Barangay Tanod' as Role, name: '', image: null },
  ])
  const [skOfficials, setSkOfficials] = useState<BlogTypedef[]>(() =>
    BLOG_CONFIG.OFFICIALS.SK_EXECUTIVE.map((official) => ({
      role: official.role as Role,
      name: official.name,
      image: official.image,
    })),
  )
  const [skKagawads, setSkKagawads] = useState<BlogTypedef[]>(() => [
    { role: 'SK Kagawad' as Role, name: '', image: null },
  ])
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  return {
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
  }
}
