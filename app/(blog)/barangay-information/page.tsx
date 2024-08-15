'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserIcon, PlusIcon, Camera } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

type Role =
  | 'Punong Barangay'
  | 'Barangay Secretary'
  | 'Barangay Treasurer'
  | 'Barangay Kagawad'
  | 'Lupong Tagapamayapa'
  | 'Barangay Tanod'
  | 'SK Chairperson'
  | 'SK Secretary'
  | 'SK Treasurer'
  | 'SK Kagawad'

interface OfficialInfo {
  id: string
  role: Role
  name: string
  image: string | null
}

export default function Component() {
  const [officials, setOfficials] = useState<OfficialInfo[]>([
    { id: '1', role: 'Punong Barangay', name: '', image: null },
    { id: '2', role: 'Barangay Secretary', name: '', image: null },
    { id: '3', role: 'Barangay Treasurer', name: '', image: null },
  ])

  const [kagawads, setKagawads] = useState<OfficialInfo[]>([])
  const [lupons, setLupons] = useState<OfficialInfo[]>([])
  const [tanods, setTanods] = useState<OfficialInfo[]>([])
  const [skOfficials, setSkOfficials] = useState<OfficialInfo[]>([
    { id: '4', role: 'SK Chairperson', name: '', image: null },
    { id: '5', role: 'SK Secretary', name: '', image: null },
    { id: '6', role: 'SK Treasurer', name: '', image: null },
  ])
  const [skKagawads, setSkKagawads] = useState<OfficialInfo[]>([])

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleImageUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updateOfficial = (official: OfficialInfo) =>
          official.id === id
            ? { ...official, image: e.target?.result as string }
            : official

        setOfficials(officials.map(updateOfficial))
        setKagawads(kagawads.map(updateOfficial))
        setLupons(lupons.map(updateOfficial))
        setTanods(tanods.map(updateOfficial))
        setSkOfficials(skOfficials.map(updateOfficial))
        setSkKagawads(skKagawads.map(updateOfficial))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNameChange = (id: string, name: string) => {
    const updateOfficial = (official: OfficialInfo) =>
      official.id === id ? { ...official, name } : official

    setOfficials(officials.map(updateOfficial))
    setKagawads(kagawads.map(updateOfficial))
    setLupons(lupons.map(updateOfficial))
    setTanods(tanods.map(updateOfficial))
    setSkOfficials(skOfficials.map(updateOfficial))
    setSkKagawads(skKagawads.map(updateOfficial))
  }

  const addOfficial = (role: Role) => {
    const newOfficial: OfficialInfo = {
      id: Date.now().toString(),
      role,
      name: '',
      image: null,
    }
    switch (role) {
      case 'Barangay Kagawad':
        setKagawads([...kagawads, newOfficial])
        break
      case 'Lupong Tagapamayapa':
        setLupons([...lupons, newOfficial])
        break
      case 'Barangay Tanod':
        setTanods([...tanods, newOfficial])
        break
      case 'SK Kagawad':
        setSkKagawads([...skKagawads, newOfficial])
        break
    }
  }

  const renderOfficialCard = (official: OfficialInfo) => (
    <Card key={official.id} className="overflow-hidden">
      <div
        className="relative h-48 cursor-pointer"
        onClick={() => fileInputRefs.current[official.id]?.click()}
      >
        {official.image ? (
          <Image
            src={official.image}
            alt={official.name || official.role}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <UserIcon className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
          <Camera className="h-8 w-8" />
        </div>
      </div>
      <CardContent className="p-4">
        <Input
          id={`name-${official.id}`}
          placeholder={official.role}
          value={official.name}
          onChange={(e) => handleNameChange(official.id, e.target.value)}
          className="mb-2"
        />
      </CardContent>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={(el) => {
          fileInputRefs.current[official.id] = el
        }}
        onChange={(e) => handleImageUpload(official.id, e)}
      />
    </Card>
  )

  const renderAddNewCard = (role: Role) => (
    <Card
      className="flex h-full cursor-pointer items-center justify-center border border-dashed"
      onClick={() => addOfficial(role)}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <PlusIcon className="mb-2 h-12 w-12 text-gray-400" />
        <p className="text-center text-sm text-gray-600">
          Add new {role.toLowerCase()}
        </p>
      </CardContent>
    </Card>
  )

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted', {
      officials,
      kagawads,
      lupons,
      tanods,
      skOfficials,
      skKagawads,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Barangay Officials</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Barangay Officials</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Barangay Executive Officials
          </h2>
          <div className="space-y-12">
            <div>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {officials.map(renderOfficialCard)}
              </div>
            </div>

            <Separator className="my-12" />

            <div>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Barangay Kagawad
              </h2>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {kagawads.map(renderOfficialCard)}
                {renderAddNewCard('Barangay Kagawad')}
              </div>
            </div>

            <Separator className="my-12" />

            <div>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Lupong Tagapamayapa
              </h2>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {lupons.map(renderOfficialCard)}
                {renderAddNewCard('Lupong Tagapamayapa')}
              </div>
            </div>

            <Separator className="my-12" />

            <div>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                SK Executive Officials
              </h2>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {skOfficials.map(renderOfficialCard)}
              </div>
            </div>

            <Separator className="my-12" />

            <div>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                SK Kagawad
              </h2>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {skKagawads.map(renderOfficialCard)}
                {renderAddNewCard('SK Kagawad')}
              </div>
            </div>

            <Separator className="my-12" />

            <div>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Barangay Tanod
              </h2>
              <div className="mb-6 text-gray-700">
                <p className="text-sm">
                  Please enter the years during which the officials started and
                  ended their term in office. The &quot;Starting Year&quot;
                  refers to when their term began, and the &quot;Ending
                  Year&quot; refers to when it concluded.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {tanods.map(renderOfficialCard)}
                {renderAddNewCard('Barangay Tanod')}
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="mb-8 flex flex-col gap-8">
            <div className="w-full">
              <p className="mb-6 text-gray-700">
                Please enter the years during which the officials started and
                ended their term in office. The &quot;Starting Year&quot; refers
                to when their term began, and the &quot;Ending Year&quot; refers
                to when it concluded.
              </p>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="w-full md:w-1/2">
                <Label
                  htmlFor="startYear"
                  className="text-sm font-medium text-gray-900"
                >
                  Starting Year
                </Label>
                <Input
                  id="startYear"
                  placeholder="Enter starting year"
                  className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Label
                  htmlFor="endYear"
                  className="text-sm font-medium text-gray-900"
                >
                  Ending Year
                </Label>
                <Input
                  id="endYear"
                  placeholder="Enter ending year"
                  className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <Checkbox id="terms" className="mr-2" />
              <Label
                htmlFor="terms"
                className="flex items-center space-x-1 text-sm font-medium text-gray-700"
              >
                <span>I accept the</span>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="cursor-pointer text-blue-500 underline">
                      Terms and Conditions
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4">
                    <h3 className="text-lg font-semibold">
                      Terms and Conditions
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Your terms and conditions content goes here. This is where
                      you provide additional information that users can view
                      when they hover over the link.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </Label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 p-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
