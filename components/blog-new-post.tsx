'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BarangayOfficialForm } from './BarangayOfficialForm'
import { useBarangayOfficials } from '@/lib/hooks/useBarangayOfficials'

export default function BarangayInformationPage() {
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
  } = useBarangayOfficials()

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
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Manage Barangay Officials</Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Barangay Officials</DialogTitle>
          </DialogHeader>
          <BarangayOfficialForm
            officials={officials}
            kagawads={kagawads}
            lupons={lupons}
            tanods={tanods}
            skOfficials={skOfficials}
            skKagawads={skKagawads}
            startYear={startYear}
            endYear={endYear}
            termsAccepted={termsAccepted}
            setOfficials={setOfficials}
            setKagawads={setKagawads}
            setLupons={setLupons}
            setTanods={setTanods}
            setSkOfficials={setSkOfficials}
            setSkKagawads={setSkKagawads}
            setStartYear={setStartYear}
            setEndYear={setEndYear}
            setTermsAccepted={setTermsAccepted}
            closeDialog={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
