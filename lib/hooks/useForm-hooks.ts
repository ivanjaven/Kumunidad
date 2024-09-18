import { toast } from 'sonner'
import { createBlog } from '@/server/actions/insert-blog'
import { useCallback } from 'react'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BlogStateTypedef } from '@/lib/typedef/blog-state-typedef'
export function useFormHooks({
  // State variables
  stateForBarangayExecutiveOfficials,
  stateForBarangaykagawads,
  stateForBarangayLupongTagapamayapa,
  stateForSKExecutiveOfficials,
  stateForSKkagawads,
  stateForBarangayTanod,
  stateForStartingYear,
  stateForEndingYear,
  stateForTermsAndConditionsAccepted,

  // Setter functions
  setBarangayExecutiveOfficials,
  setBarangaykagawads,
  setBarangayLupongTagapamayapa,
  setSKExecutiveOfficials,
  setSKkagawads,
  setBarangayTanod,
  setStartingYear,
  setEndingYear,
  setTermsAndConditionsAccepted,
  setCloseDialog,
}: BlogStateTypedef) {
  const handleReset = useCallback(() => {
    setBarangayExecutiveOfficials(
      BLOG_CONFIG.OFFICIALS.EXECUTIVE.map((official) => ({
        role: official.role as Role,
        name: '',
        image: null,
      })),
    )
    setBarangaykagawads([
      { role: 'Barangay Kagawad' as Role, name: '', image: null },
    ])
    setBarangayLupongTagapamayapa([
      { role: 'Lupong Tagapamayapa' as Role, name: '', image: null },
    ])
    setSKExecutiveOfficials(
      BLOG_CONFIG.OFFICIALS.SK_EXECUTIVE.map((official) => ({
        role: official.role as Role,
        name: '',
        image: null,
      })),
    )
    setSKkagawads([{ role: 'SK Kagawad' as Role, name: '', image: null }])
    setBarangayTanod([
      { role: 'Barangay Tanod' as Role, name: '', image: null },
    ])
    setStartingYear('')
    setEndingYear('')
    setTermsAndConditionsAccepted(false)
  }, [
    setBarangayExecutiveOfficials,
    setBarangaykagawads,
    setBarangayLupongTagapamayapa,
    setSKExecutiveOfficials,
    setSKkagawads,
    setBarangayTanod,
    setStartingYear,
    setEndingYear,
    setTermsAndConditionsAccepted,
  ])

  const handleSubmit = useCallback(async () => {
    const allData = {
      stateForBarangayExecutiveOfficials,
      stateForBarangaykagawads,
      stateForBarangayLupongTagapamayapa,
      stateForSKExecutiveOfficials,
      stateForSKkagawads,
      stateForBarangayTanod,
      stateForStartingYear,
      stateForEndingYear,
      stateForTermsAndConditionsAccepted,
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

    checkOfficials(
      allData.stateForBarangayExecutiveOfficials,
      'Executive Official',
    )
    checkOfficials(allData.stateForBarangaykagawads, 'Kagawad')
    checkOfficials(allData.stateForBarangayLupongTagapamayapa, 'Lupon')
    checkOfficials(
      allData.stateForSKExecutiveOfficials,
      'SK Executive Official',
    )
    checkOfficials(allData.stateForSKkagawads, 'SK Kagawad')
    checkOfficials(allData.stateForBarangayTanod, 'Tanod')

    if (!allData.stateForStartingYear) errors.push('Starting year is required')
    if (!allData.stateForEndingYear) errors.push('Ending year is required')
    if (!stateForTermsAndConditionsAccepted)
      errors.push('You must accept the terms and conditions')

    if (errors.length > 0) {
      toast.error(errors[0], {
        description: new Date().toLocaleString(),
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
    } else {
      try {
        const result = await createBlog({
          stateForBarangayExecutiveOfficials,
          stateForBarangaykagawads,
          stateForBarangayLupongTagapamayapa,
          stateForSKExecutiveOfficials,
          stateForSKkagawads,
          stateForBarangayTanod,
          stateForStartingYear,
          stateForEndingYear,
          stateForTermsAndConditionsAccepted,
          setBarangayExecutiveOfficials,
          setBarangaykagawads,
          setBarangayLupongTagapamayapa,
          setSKExecutiveOfficials,
          setSKkagawads,
          setBarangayTanod,
          setStartingYear,
          setEndingYear,
          setTermsAndConditionsAccepted,
          setCloseDialog,
        })
        console.log('Blog created successfully:', result)
        toast.success('Blog created successfully', { duration: 3000 })
        setCloseDialog()
        handleReset()
      } catch (error) {
        console.error('Error creating blog:', error)
        toast.error('Failed to create blog. Please try again.', {
          duration: 3000,
        })
      }
    }
  }, [
    stateForBarangayExecutiveOfficials,
    stateForBarangaykagawads,
    stateForBarangayLupongTagapamayapa,
    stateForSKExecutiveOfficials,
    stateForSKkagawads,
    stateForBarangayTanod,
    stateForStartingYear,
    stateForEndingYear,
    stateForTermsAndConditionsAccepted,
    setBarangayExecutiveOfficials,
    setBarangaykagawads,
    setBarangayLupongTagapamayapa,
    setSKExecutiveOfficials,
    setSKkagawads,
    setBarangayTanod,
    setStartingYear,
    setEndingYear,
    setTermsAndConditionsAccepted,
    setCloseDialog,
    handleReset,
  ])

  return { handleSubmit, handleReset }
}
