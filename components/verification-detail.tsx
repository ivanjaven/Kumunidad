import React, { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { CameraIcon, Fingerprint } from 'lucide-react'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { toast } from 'sonner'

interface VerificationDetailProps {
  formData: RegistrationTypedef
  onFormDataChange: (id: keyof RegistrationTypedef, value: string) => void
}

export function VerificationDetail({
  formData,
  onFormDataChange,
}: VerificationDetailProps) {
  const [photo, setPhoto] = useState<string | null>(
    formData.image_base64 || null,
  )
  const [fingerprintImage, setFingerprintImage] = useState<string | null>(
    formData.fingerprint_fmd || null,
  )
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isCapturingFingerprint, setIsCapturingFingerprint] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const socketRef = useRef<WebSocket | null>(null)

  const connectWebSocket = useCallback(() => {
    console.log('Attempting to connect WebSocket...')
    socketRef.current = new WebSocket('ws://localhost:8080/fingerprint-ws')

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established')
    }

    socketRef.current.onmessage = (event) => {
      console.log('WebSocket message received:', event.data)
      const data = JSON.parse(event.data)
      if (data.status === 'success') {
        const fingerprintDataUrl = `data:image/png;base64,${data.image}`
        setFingerprintImage(fingerprintDataUrl)
        onFormDataChange('fingerprint_fmd', data.fmd)
        setIsCapturingFingerprint(false)
        toast.success('Fingerprint captured successfully')
      } else {
        setIsCapturingFingerprint(false)
        toast.error(`Capture failed: ${data.message}`)
      }
    }

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsCapturingFingerprint(false)
    }

    socketRef.current.onclose = () => {
      console.log('Fingerprint connection failed. Attempting to reconnect...')
      setTimeout(connectWebSocket, 1000)
    }
  }, [onFormDataChange])

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [connectWebSocket])

  const handleOpenCamera = () => {
    setIsCameraOpen(true)
  }

  const handleCapturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: 1024,
      height: 1024,
    })
    if (imageSrc) {
      setPhoto(imageSrc)
      setIsCameraOpen(false)
      onFormDataChange('image_base64', imageSrc)
    }
  }, [webcamRef, onFormDataChange])

  const handleCaptureFingerprint = useCallback(() => {
    setIsCapturingFingerprint(true)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending "capture" message to WebSocket')
      socketRef.current.send('capture')
    } else {
      console.log(
        'WebSocket not ready. Current state:',
        socketRef.current?.readyState,
      )
      setIsCapturingFingerprint(false)
      toast.error('Fingerprint scanner is connecting. Please try again.')
    }
  }, [])

  const { facialPhoto, fingerprint } = REGISTRATION_CONFIG.verificationDetails

  return (
    <div className="mx-auto mt-16 max-w-6xl space-y-12 p-3 text-black">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Facial Photo Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{facialPhoto.title}</h2>
            <p className="text-base text-gray-800">{facialPhoto.subtitle}</p>
          </div>
          <div className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
            {isCameraOpen ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="h-full w-full object-cover"
                videoConstraints={{
                  width: 512,
                  height: 512,
                }}
              />
            ) : photo ? (
              <Image
                src={photo}
                alt="Captured"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <CameraIcon className="h-16 w-16 text-gray-700" />
            )}
          </div>
          <ul className="list-disc pl-6 text-base text-gray-800">
            {facialPhoto.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          {isCameraOpen ? (
            <Button
              className="w-full text-lg font-semibold"
              size="lg"
              onClick={handleCapturePhoto}
            >
              <CameraIcon className="mr-2 h-6 w-6" />
              Capture Photo
            </Button>
          ) : (
            <Button
              className="w-full text-lg font-semibold"
              size="lg"
              onClick={handleOpenCamera}
            >
              <CameraIcon className="mr-2 h-6 w-6" />
              Open Camera
            </Button>
          )}
        </div>

        {/* Fingerprint Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{fingerprint.title}</h2>
            <p className="text-base text-gray-800">{fingerprint.subtitle}</p>
          </div>
          <div className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
            {fingerprintImage ? (
              <Image
                src={fingerprintImage}
                alt="Captured Fingerprint"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <Fingerprint className="h-16 w-16 text-gray-700" />
            )}
          </div>
          <ul className="list-disc pl-6 text-base text-gray-800">
            {fingerprint.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <Button
            className="w-full text-lg font-semibold"
            size="lg"
            onClick={handleCaptureFingerprint}
            disabled={isCapturingFingerprint}
          >
            <Fingerprint className="mr-2 h-6 w-6" />
            {isCapturingFingerprint ? 'Capturing...' : 'Capture Fingerprint'}
          </Button>
        </div>
      </div>
    </div>
  )
}
