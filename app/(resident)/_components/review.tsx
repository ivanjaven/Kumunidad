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

export default function Review({
  formData,
}: {
  formData: RegistrationTypedef
}) {
  return (
    <div className="container mx-auto mt-11 max-w-5xl bg-white p-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center md:col-span-1">
          {formData.image_base64 ? (
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-gray-200 shadow-lg">
              <Image
                src={formData.image_base64}
                alt="User"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="flex h-72 w-72 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 shadow-inner">
              <Camera className="h-24 w-24 text-gray-400" />
            </div>
          )}
          <h3 className="mt-6 text-center text-2xl font-bold text-gray-800">{`${formData.surname} ${formData.name} ${formData.middleName}`}</h3>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-8 border-b pb-2 text-3xl font-bold text-gray-800">
            Applicant Information
          </h3>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            {[
              {
                icon: Calendar,
                label: 'Date of Birth',
                value: `${formData.day}/${formData.month}/${formData.year}`,
              },
              { icon: User, label: 'Gender', value: formData.gender },
              { icon: Heart, label: 'Marital Status', value: formData.status },
              {
                icon: Home,
                label: 'Address',
                value: `${formData.street} ${formData.houseNumber}`,
              },
              { icon: Phone, label: 'Phone', value: formData.phone },
              { icon: Mail, label: 'Email', value: formData.email },
              {
                icon: Briefcase,
                label: 'Occupation',
                value: formData.occupation,
              },
              { icon: Flag, label: 'Nationality', value: formData.nationality },
              { icon: Star, label: 'Religion', value: formData.religion },
              { icon: Star, label: 'Benefits', value: formData.benefits },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-4 mt-1">
                  <item.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{item.label}</p>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
