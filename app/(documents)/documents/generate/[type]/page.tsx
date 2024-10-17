'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import GenerateDocumentForm from '@/components/generate-document-form'
import { DOCUMENT_CONFIG } from '@/lib/config/DOCUMENT_CONFIG'
import { insertDocumentIssuanceRecord } from '@/server/actions/insert-document-issuance-record'
import { generateDocument } from '@/server/services/generate-document'
import {
  DocumentIssuanceTypedef,
  DocumentTitle,
} from '@/lib/typedef/document-issuance-typedef'
import { fetchUser } from '@/server/queries/fetch-user'
import ProgressBar from '@/components/ui/progress-bar'
import { useProgress } from '@/lib/hooks/useProgress'
import { toast } from 'sonner'

type DocumentType = keyof typeof DOCUMENT_CONFIG.document

export default function GenerateDocument() {
  const params = useParams()
  const type = params.type as string
  const [config, setConfig] = useState<
    (typeof DOCUMENT_CONFIG.document)[DocumentType] | null
  >(null)
  const [isLoading, setIsLoading] = useState(false)
  const { progress, updateProgress, resetProgress } = useProgress()
  const [identifiedUser, setIdentifiedUser] = useState<{
    residentId: number
    fullName: string
    imageBase64: string
    purok: number
  } | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const [isIdentifying, setIsIdentifying] = useState(false)

  useEffect(() => {
    if (type) {
      const configKey = type.replace(/-/g, '_').toLowerCase() as DocumentType
      const documentConfig = DOCUMENT_CONFIG.document[configKey]

      if (documentConfig) {
        setConfig(documentConfig)
      } else {
        console.error('No configuration found for document type:', configKey)
      }
    }
  }, [type])

  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket('ws://localhost:8080/fingerprint-ws')

      socketRef.current.onopen = () => {
        console.log('WebSocket connection established')
      }

      socketRef.current.onmessage = async (event) => {
        console.log('WebSocket message received:', event.data)
        const data = JSON.parse(event.data)
        if (data.status === 'success' && data.resident) {
          const user = await fetchUser(data.resident.residentId)
          const userInfo = user[0]
          setIdentifiedUser({
            residentId: data.resident.residentId,
            fullName: data.resident.fullName,
            imageBase64: userInfo.image_base64,
            purok: Number(userInfo.street_id),
          })
          setIsIdentifying(false)
          toast.success('User identified successfully')
        } else if (data.status === 'not_found') {
          setIsIdentifying(false)
          toast.error('No matching user found')
        } else {
          setIsIdentifying(false)
          toast.error(`Identification failed: ${data.message}`)
        }
      }

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsIdentifying(false)
      }

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...')
        setTimeout(connectWebSocket, 3000)
      }
    }

    connectWebSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  const handleIdentify = () => {
    setIsIdentifying(true)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending "identify" message to WebSocket')
      socketRef.current.send('identify')
    } else {
      console.log(
        'WebSocket not ready. Current state:',
        socketRef.current?.readyState,
      )
      setIsIdentifying(false)
      toast.error('Fingerprint scanner is connecting. Please try again.')
    }
  }

  const handleSubmit = async (data: Record<string, any>) => {
    if (!config) {
      console.error('Configuration not loaded')
      return
    }
    if (!identifiedUser) {
      toast.error('Please identify the user first')
      return
    }
    try {
      setIsLoading(true)
      resetProgress()
      updateProgress(10) // Start progress

      // Get values from fields
      const priceField = config.fields.find(
        (field: { name: string }) => field.name.toLowerCase() === 'price',
      )
      const priceValue = priceField ? parseFloat(data[priceField.name]) : 0 // for saving price in the database

      const businessNameField = config.fields.find(
        (field: { name: string }) =>
          field.name.toLowerCase() === 'business name',
      )
      const businessName = businessNameField ? data[businessNameField.name] : ''

      const reasonField = config.fields.find(
        (field: { name: string }) => field.name.toLowerCase() === 'reason',
      )
      const reason = reasonField ? data[reasonField.name] : ''

      const user = await fetchUser(identifiedUser.residentId)
      const userInfo = user[0]

      const requiredData = {
        surname: userInfo.last_name,
        firstName: userInfo.first_name,
        middleName: userInfo.middle_name,
        price: priceValue,
        image: identifiedUser.imageBase64,
        purok: userInfo.street_id,
        businessName: businessName,
        template: config.path,
        reason: reason,
        burial: data['Burial Assistance'] || ' ',
        education: data['Educational Assistance'] || ' ',
        medical: data['Medical Assistance'] || ' ',
        financial: data['Financial Assistance'] || ' ',
        others: data['Others'] || ' ',
      }

      updateProgress(20)

      const documentData: DocumentIssuanceTypedef = {
        document_title: config.name as DocumentTitle,
        resident_id: identifiedUser.residentId,
        required_fields: data,
        issued_by: 'Secretary Kim', // placeholder for now
        price: priceValue,
      }

      console.log('Submitting document data:', documentData)

      const result = await insertDocumentIssuanceRecord(documentData)
      console.log('Document issuance record inserted:', result)

      // Generate and print PDF using the generateDocument function
      updateProgress(70)
      const blob = await generateDocument(requiredData)
      updateProgress(90)

      const url = window.URL.createObjectURL(blob)

      // Open PDF in a popup window
      const popupWidth = 900
      const popupHeight = 800
      const left = (window.screen.width - popupWidth) / 2
      const top = (window.screen.height - popupHeight) / 2

      const pdfWindow = window.open(
        url,
        'Certificate of Residency',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`,
      )

      if (pdfWindow) {
        pdfWindow.addEventListener('load', () => {
          pdfWindow.print()
        })
      } else {
        alert('Please allow pop-ups to view and print the certificate.')
      }

      // Simulate a smooth progress to 100%
      const smoothProgress = setInterval(() => {
        updateProgress((prev) => {
          if (prev >= 99) {
            clearInterval(smoothProgress)
            return 100
          }
          return prev + 1
        })
      }, 20)

      setTimeout(() => {
        clearInterval(smoothProgress)
        updateProgress(100)
        setIsLoading(false)
        alert('Document generated successfully!')
      }, 1000)
    } catch (error) {
      console.error('Error generating document:', error)
      setIsLoading(false)
      resetProgress()
      if (error instanceof Error) {
        alert(`Failed to generate document: ${error.message}`)
      } else {
        alert('Failed to generate document. Please try again.')
      }
    }
  }

  if (!config) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-20 mt-4 flex justify-center align-middle text-3xl font-bold">
        Generate {config.name}
      </h1>
      <GenerateDocumentForm
        fields={config.fields}
        document={config.name}
        onSubmit={handleSubmit}
        onIdentify={handleIdentify}
        isIdentifying={isIdentifying}
        identifiedUser={identifiedUser}
      />
      {isLoading && (
        <ProgressBar title={`Generating ${config.name}`} progress={progress} />
      )}
    </div>
  )
}
