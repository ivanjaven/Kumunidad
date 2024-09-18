import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { CameraIcon, Fingerprint } from 'lucide-react'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'

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
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const webcamRef = useRef<Webcam>(null)

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
          <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border-4 border-gray-800 shadow-lg">
            <Fingerprint className="h-16 w-16 text-gray-700" />
          </div>
          <ul className="list-disc pl-6 text-base text-gray-800">
            {fingerprint.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <Button className="w-full text-lg font-semibold" size="lg">
            <Fingerprint className="mr-2 h-6 w-6" />
            Capture Fingerprint
          </Button>
        </div>
      </div>
    </div>
  )
}
