import { toast } from 'sonner'
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
  /**
   * Resets all form fields to their initial state.
   * Uses the BLOG_CONFIG for initializing some fields with default values.
   */
  const handleReset = useCallback(() => {
    // Reset all form fields to their initial state
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
    // Dependencies for useCallback
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

  /**
   * Handles form submission.
   * Validates all form fields and submits the data if all validations pass.
   * Displays error messages for any validation failures.
   */
  const handleSubmit = useCallback(() => {
    // Aggregate all form data
    const allData = {
      executiveOfficials: stateForBarangayExecutiveOfficials,
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

    /**
     * Helper function to check if official names and images are provided
     * @param {BlogTypedef[]} officials - Array of officials to check
     * @param {string} roleName - Name of the role for error messages
     */
    const checkOfficials = (officials: BlogTypedef[], roleName: string) => {
      officials.forEach((official) => {
        if (!official.name)
          errors.push(`${roleName} ${official.role} name is required`)
        if (!official.image)
          errors.push(`${roleName} ${official.role} image is required`)
      })
    }

    // Perform validations
    checkOfficials(allData.executiveOfficials, 'Executive Official')
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

    // Handle errors or submit form
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
      setCloseDialog()
      handleReset()
    }
  }, [
    // Dependencies for useCallback
    stateForBarangayExecutiveOfficials,
    stateForBarangaykagawads,
    stateForBarangayLupongTagapamayapa,
    stateForSKExecutiveOfficials,
    stateForSKkagawads,
    stateForBarangayTanod,
    stateForStartingYear,
    stateForEndingYear,
    stateForTermsAndConditionsAccepted,
    setCloseDialog,
    handleReset,
  ])

  return { handleSubmit, handleReset }
}
