import React from 'react'
import Image from 'next/image'
import {
  User,
  Calendar,
  Home,
  Phone,
  Mail,
  Briefcase,
  Flag,
  Heart,
  Star,
  Camera,
} from 'lucide-react'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'

type InfoItem = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

const InfoItemComponent: React.FC<{ item: InfoItem }> = ({ item }) => (
  <div className="flex items-start space-x-4 border-b border-gray-200 pb-4">
    <item.icon className="h-6 w-6 text-gray-700" />
    <div>
      <p className="text-sm font-medium text-gray-600">{item.label}</p>
      <p className="text-lg font-bold text-gray-900">{item.value}</p>
    </div>
  </div>
)

type ReviewDetailProps = {
  formData: RegistrationTypedef
  metadata: MetadataTypedef
}

const formatDate = (day: string, month: string, year: string) => {
  const date = new Date(`${year}-${month}-${day}`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ReviewDetail({ formData, metadata }: ReviewDetailProps) {
  const getValueFromMetadata = (key: keyof MetadataTypedef, id: number) => {
    const item = (metadata[key] as any[])?.find((item) => item.id === id)
    return item ? item.type || item.name : ''
  }

  const infoItems: InfoItem[] = [
    {
      icon: Calendar,
      label: 'Date of Birth',
      value: formatDate(formData.day, formData.month, formData.year),
    },
    { icon: User, label: 'Gender', value: formData.gender },
    { icon: Heart, label: 'Marital Status', value: formData.status },
    {
      icon: Home,
      label: 'Address',
      value: `${getValueFromMetadata('street', parseInt(formData.street))} ${formData.houseNumber}`,
    },
    {
      icon: Phone,
      label: 'Mobile',
      value: formData.mobile || 'N/A',
    },
    {
      icon: Mail,
      label: 'Email',
      value: formData.email || 'N/A',
    },
    {
      icon: Briefcase,
      label: 'Occupation',
      value: getValueFromMetadata('occupation', parseInt(formData.occupation)),
    },
    {
      icon: Flag,
      label: 'Nationality',
      value: getValueFromMetadata(
        'nationality',
        parseInt(formData.nationality),
      ),
    },
    {
      icon: Star,
      label: 'Religion',
      value: getValueFromMetadata('religion', parseInt(formData.religion)),
    },
    {
      icon: Star,
      label: 'Benefits',
      value: getValueFromMetadata('benefits', parseInt(formData.benefits)),
    },
  ]

  return (
    <div className="container mx-auto mb-16 max-w-6xl px-4">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center md:col-span-1">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6">
              {formData.image_base64 ? (
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
                  <Image
                    src={formData.image_base64}
                    alt={`${formData.surname} ${formData.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-4 border-gray-800 shadow-lg">
                  <Camera className="h-16 w-16 text-gray-700" />
                </div>
              )}
            </div>
            <h3 className="text-center text-2xl font-bold text-gray-900">{`${formData.surname} ${formData.name} ${formData.middlename}`}</h3>
          </div>
        </div>
        <div className="mt-3 md:col-span-2">
          <div className="grid gap-8 sm:grid-cols-2">
            {infoItems.map((item, index) => (
              <InfoItemComponent key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
