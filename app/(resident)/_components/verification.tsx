import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { CameraIcon, Fingerprint } from 'lucide-react'

interface IdentityVerificationProps {
  formData: RegistrationTypedef
  onFormDataChange: (id: keyof RegistrationTypedef, value: string) => void
}

export default function IdentityVerification({
  formData,
  onFormDataChange,
}: IdentityVerificationProps) {
  const [photo, setPhoto] = useState<string | null>(
    formData.image_base64 || null,
  )
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  const handleTakePhoto = () => {
    setIsCameraOpen(true)
  }

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setPhoto(imageSrc)
      setIsCameraOpen(false)
      onFormDataChange('image_base64', imageSrc)
    }
  }, [webcamRef, onFormDataChange])

  return (
    <div className="mx-auto mt-8 max-w-6xl space-y-8 p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Facial Photo</CardTitle>
            <CardDescription>Take a clear photo of your face</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/50 bg-muted">
                {isCameraOpen ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="h-full w-full object-cover"
                  />
                ) : photo ? (
                  <Image
                    src={photo}
                    alt="Captured"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <CameraIcon className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <ul className="text-m list-disc pl-5">
                <li>Ensure good lighting</li>
                <li>Face the camera directly</li>
                <li>Remove glasses or hats</li>
              </ul>
              {isCameraOpen ? (
                <Button className="w-full" size="lg" onClick={capturePhoto}>
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Capture Photo
                </Button>
              ) : (
                <Button className="w-full" size="lg" onClick={handleTakePhoto}>
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Open Camera
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Fingerprint</CardTitle>
            <CardDescription>Capture your fingerprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-primary/50 bg-muted">
                <Fingerprint className="h-12 w-12 text-muted-foreground" />
              </div>
              <ul className="text-m list-disc pl-5">
                <li>Clean your fingertip</li>
                <li>Place finger flat on the sensor</li>
                <li>Hold still until capture is complete</li>
              </ul>
              <Button className="w-full" size="lg">
                <Fingerprint className="mr-2 h-4 w-4" />
                Capture Fingerprint
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
