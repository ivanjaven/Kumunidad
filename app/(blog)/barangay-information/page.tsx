'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserIcon, PlusIcon, Camera, X } from 'lucide-react'
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
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'

export default function BarangayInformationPage() {
  const [officials, setOfficials] = useState<BlogTypedef[]>(
    BLOG_CONFIG.OFFICIALS.EXECUTIVE.map((official) => ({
      role: official.role as Role,
      name: official.name,
      image: official.image,
    })),
  )
  const [kagawads, setKagawads] = useState<BlogTypedef[]>([])
  const [lupons, setLupons] = useState<BlogTypedef[]>([])
  const [tanods, setTanods] = useState<BlogTypedef[]>([])
  const [skOfficials, setSkOfficials] = useState<BlogTypedef[]>(
    BLOG_CONFIG.OFFICIALS.SK_EXECUTIVE.map((official) => ({
      role: official.role as Role,
      name: official.name,
      image: official.image,
    })),
  )
  const [skKagawads, setSkKagawads] = useState<BlogTypedef[]>([])

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleImageUpload = useCallback(
    (role: Role, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const updateOfficial = (official: BlogTypedef, i: number) =>
            i === index
              ? { ...official, image: e.target?.result as string }
              : official

          setOfficials((prev) => prev.map(updateOfficial))
          setKagawads((prev) => prev.map(updateOfficial))
          setLupons((prev) => prev.map(updateOfficial))
          setTanods((prev) => prev.map(updateOfficial))
          setSkOfficials((prev) => prev.map(updateOfficial))
          setSkKagawads((prev) => prev.map(updateOfficial))
        }
        reader.readAsDataURL(file)
      }
    },
    [],
  )

  const handleNameChange = useCallback(
    (role: Role, index: number, name: string) => {
      const updateOfficial = (official: BlogTypedef, i: number) =>
        i === index ? { ...official, name } : official

      setOfficials((prev) => prev.map(updateOfficial))
      setKagawads((prev) => prev.map(updateOfficial))
      setLupons((prev) => prev.map(updateOfficial))
      setTanods((prev) => prev.map(updateOfficial))
      setSkOfficials((prev) => prev.map(updateOfficial))
      setSkKagawads((prev) => prev.map(updateOfficial))
    },
    [],
  )

  const addOfficial = useCallback((role: Role) => {
    const newOfficial: BlogTypedef = {
      role,
      name: '',
      image: null,
    }
    switch (role) {
      case 'Barangay Kagawad':
        setKagawads((prev) => [...prev, newOfficial])
        break
      case 'Lupong Tagapamayapa':
        setLupons((prev) => [...prev, newOfficial])
        break
      case 'Barangay Tanod':
        setTanods((prev) => [...prev, newOfficial])
        break
      case 'SK Kagawad':
        setSkKagawads((prev) => [...prev, newOfficial])
        break
    }
  }, [])

  const removeOfficial = useCallback((role: Role, index: number) => {
    const removeFromArray = (array: BlogTypedef[]) =>
      array.filter((_, i) => i !== index)

    switch (role) {
      case 'Barangay Kagawad':
        setKagawads((prev) => removeFromArray(prev))
        break
      case 'Lupong Tagapamayapa':
        setLupons((prev) => removeFromArray(prev))
        break
      case 'Barangay Tanod':
        setTanods((prev) => removeFromArray(prev))
        break
      case 'SK Kagawad':
        setSkKagawads((prev) => removeFromArray(prev))
        break
    }
  }, [])

  const renderOfficialCard = useCallback(
    (official: BlogTypedef, index: number) => (
      <Card
        key={`${official.role}-${index}`}
        className="relative overflow-hidden"
      >
        {BLOG_CONFIG.ADDITIONAL_ROLES.some(
          (role) => role.role === official.role,
        ) && (
          <button
            className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center bg-gray-100/80 hover:bg-gray-100"
            onClick={() => removeOfficial(official.role, index)}
          >
            <X size={16} />
          </button>
        )}
        <div
          className="relative h-48 cursor-pointer"
          onClick={() =>
            fileInputRefs.current[`${official.role}-${index}`]?.click()
          }
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
            placeholder={official.role}
            value={official.name}
            onChange={(e) =>
              handleNameChange(official.role, index, e.target.value)
            }
            className="mb-2"
          />
        </CardContent>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={(el) => {
            fileInputRefs.current[`${official.role}-${index}`] = el
          }}
          onChange={(e) => handleImageUpload(official.role, index, e)}
        />
      </Card>
    ),
    [handleImageUpload, handleNameChange, removeOfficial],
  )

  const renderAddNewCard = useCallback(
    (role: Role) => (
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
    ),
    [addOfficial],
  )

  const handleSubmit = useCallback(() => {
    // Handle form submission
    console.log('Form submitted', {
      officials,
      kagawads,
      lupons,
      tanods,
      skOfficials,
      skKagawads,
    })
  }, [officials, kagawads, lupons, tanods, skOfficials, skKagawads])

  const renderSection = useCallback(
    (title: string, key: string, infoText: string) => {
      let officialsToRender: BlogTypedef[] = []
      let addNewRole: Role | null = null

      switch (key) {
        case 'EXECUTIVE':
          officialsToRender = officials
          break
        case 'BARANGAY_KAGAWAD':
          officialsToRender = kagawads
          addNewRole = 'Barangay Kagawad'
          break
        case 'LUPONG_TAGAPAMAYAPA':
          officialsToRender = lupons
          addNewRole = 'Lupong Tagapamayapa'
          break
        case 'SK_EXECUTIVE':
          officialsToRender = skOfficials
          break
        case 'SK_KAGAWAD':
          officialsToRender = skKagawads
          addNewRole = 'SK Kagawad'
          break
        case 'BARANGAY_TANOD':
          officialsToRender = tanods
          addNewRole = 'Barangay Tanod'
          break
      }

      return (
        <div key={key}>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
          <div className="mb-6 text-gray-700">
            <p className="text-sm">{infoText}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {officialsToRender.map((official, index) =>
              renderOfficialCard(official, index),
            )}
            {addNewRole && renderAddNewCard(addNewRole)}
          </div>
        </div>
      )
    },
    [
      officials,
      kagawads,
      lupons,
      skOfficials,
      skKagawads,
      tanods,
      renderOfficialCard,
      renderAddNewCard,
    ],
  )

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
          <div className="space-y-12">
            {BLOG_CONFIG.SECTIONS.map((section, index) => (
              <div key={section.key}>
                {renderSection(section.title, section.key, section.infoText)}
                {index < BLOG_CONFIG.SECTIONS.length - 1 && (
                  <Separator className="my-12" />
                )}
              </div>
            ))}
          </div>

          <Separator className="my-12" />

          <div className="mb-8 flex flex-col gap-8">
            <div className="w-full">
              <p className="mb-6 text-gray-700">{BLOG_CONFIG.TERM_INFO_TEXT}</p>
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
                <span>{BLOG_CONFIG.TERMS_AND_CONDITIONS.TEXT}</span>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="cursor-pointer text-blue-500 underline">
                      {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4">
                    <h3 className="text-lg font-semibold">
                      {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {BLOG_CONFIG.TERMS_AND_CONDITIONS.CONTENT}
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
