'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BlogCustomForm } from '@/components/blog-custom-form'
import { useDialogHooks } from '@/lib/hooks/useDialog-hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function BlogDialogForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
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
  } = useDialogHooks()

  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('barangayOfficials')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setOfficials(parsedData.officials)
      setKagawads(parsedData.kagawads)
      setLupons(parsedData.lupons)
      setTanods(parsedData.tanods)
      setSkOfficials(parsedData.skOfficials)
      setSkKagawads(parsedData.skKagawads)
      setStartYear(parsedData.startYear)
      setEndYear(parsedData.endYear)
      setTermsAccepted(parsedData.termsAccepted)
    }
  }, [
    setEndYear,
    setKagawads,
    setLupons,
    setOfficials,
    setSkKagawads,
    setSkOfficials,
    setStartYear,
    setTanods,
    setTermsAccepted,
  ])

  // Save data to local storage whenever state changes
  useEffect(() => {
    const dataToSave = {
      officials,
      kagawads,
      lupons,
      tanods,
      skOfficials,
      skKagawads,
      startYear,
      endYear,
      termsAccepted,
    }
    localStorage.setItem('barangayOfficials', JSON.stringify(dataToSave))
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
  ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Officials</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Barangay Officials</DialogTitle>
        </DialogHeader>
        <BlogCustomForm
          stateForBarangayExecutiveOfficials={officials}
          stateForBarangaykagawads={kagawads}
          stateForBarangayLupongTagapamayapa={lupons}
          stateForSKExecutiveOfficials={skOfficials}
          stateForSKkagawads={skKagawads}
          stateForBarangayTanod={tanods}
          stateForStartingYear={startYear}
          stateForEndingYear={endYear}
          stateForTermsAndConditionsAccepted={termsAccepted}
          setBarangayExecutiveOfficials={setOfficials}
          setBarangaykagawads={setKagawads}
          setBarangayLupongTagapamayapa={setLupons}
          setSKExecutiveOfficials={setSkOfficials}
          setSKkagawads={setSkKagawads}
          setBarangayTanod={setTanods}
          setStartingYear={setStartYear}
          setEndingYear={setEndYear}
          setTermsAndConditionsAccepted={setTermsAccepted}
          setCloseDialog={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
