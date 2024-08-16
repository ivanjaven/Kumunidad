import { useCallback } from 'react'
import { toast } from 'sonner'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'

interface UseBarangayOfficialFormProps {
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

export function useBarangayOfficialForm({
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
}: UseBarangayOfficialFormProps) {
  const handleClear = useCallback(() => {
    setOfficials(
      BLOG_CONFIG.OFFICIALS.EXECUTIVE.map((official) => ({
        role: official.role as Role,
        name: '',
        image: null,
      })),
    )
    setKagawads([{ role: 'Barangay Kagawad' as Role, name: '', image: null }])
    setLupons([{ role: 'Lupong Tagapamayapa' as Role, name: '', image: null }])
    setTanods([{ role: 'Barangay Tanod' as Role, name: '', image: null }])
    setSkOfficials(
      BLOG_CONFIG.OFFICIALS.SK_EXECUTIVE.map((official) => ({
        role: official.role as Role,
        name: '',
        image: null,
      })),
    )
    setSkKagawads([{ role: 'SK Kagawad' as Role, name: '', image: null }])
    setStartYear('')
    setEndYear('')
    setTermsAccepted(false)
  }, [
    setOfficials,
    setKagawads,
    setLupons,
    setTanods,
    setSkOfficials,
    setSkKagawads,
    setStartYear,
    setEndYear,
    setTermsAccepted,
  ])

  const handleSubmit = useCallback(() => {
    const allData = {
      executiveOfficials: officials,
      kagawads,
      lupons,
      tanods,
      skExecutiveOfficials: skOfficials,
      skKagawads,
      startYear,
      endYear,
      termsAccepted,
    }

    const errors: string[] = []

    const checkOfficials = (officials: BlogTypedef[], roleName: string) => {
      officials.forEach((official) => {
        if (!official.name)
          errors.push(`${roleName} ${official.role} name is required`)
        if (!official.image)
          errors.push(`${roleName} ${official.role} image is required`)
      })
    }

    checkOfficials(allData.executiveOfficials, 'Executive Official')
    checkOfficials(allData.kagawads, 'Kagawad')
    checkOfficials(allData.lupons, 'Lupon')
    checkOfficials(allData.skExecutiveOfficials, 'SK Executive Official')
    checkOfficials(allData.skKagawads, 'SK Kagawad')
    checkOfficials(allData.tanods, 'Tanod')

    if (!allData.startYear) errors.push('Starting year is required')
    if (!allData.endYear) errors.push('Ending year is required')
    if (!termsAccepted) errors.push('You must accept the terms and conditions')

    if (errors.length > 0) {
      toast.error(errors[0], {
        description: new Date().toLocaleString(),
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
    } else {
      console.log(
        'Form submitted with the following data:',
        JSON.stringify(allData, null, 2),
      )
      toast.success('Form submitted successfully', { duration: 3000 })
      closeDialog()
      handleClear()
    }
  }, [
    officials,
    kagawads,
    lupons,
    tanods,
    skOfficials,
    skKagawads,
    startYear,
    endYear,
    termsAccepted,
    closeDialog,
    handleClear,
  ])

  return { handleSubmit, handleClear }
}
