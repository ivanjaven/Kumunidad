'use client'

import React, { useState } from 'react'

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch(
        '/api/generate-pdf?name=MALVAR LLORIN ELCANO&purok=Purok 6&yearOfResidency=2022&dateIssued=16TH day of July, 2024',
      )
      if (!response.ok) throw new Error('PDF generation failed')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'residency_certificate.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-8 text-4xl font-bold">
        Generate Residency Certificate
      </h1>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate PDF'}
      </button>
    </div>
  )
}
