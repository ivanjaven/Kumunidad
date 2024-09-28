'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BlogDisplay } from '@/components/blog-display'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Grid, List } from 'lucide-react'
import { BatchCard } from '@/components/BatchCard'
import { BatchTypedef } from '@/lib/typedef/batch-typedef'
import { fetchBatches } from '@/server/queries/fetch-batches'
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog'
import { BlogDialogForm } from '@/components/blog-dialog-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BlogTypedef } from '@/lib/typedef/blog-typedef'
import { fetchBlogs } from '@/server/queries/fetch-blog'

export default function Home() {
  const [viewMode, setViewMode] = useState('list')
  const [batches, setBatches] = useState<BatchTypedef[]>([])
  const [batchToDelete, setBatchToDelete] = useState<BatchTypedef | null>(null)
  const [selectedBatch, setSelectedBatch] = useState<string>('')
  const [blogs, setBlogs] = useState<BlogTypedef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const fetchedBatches = await fetchBatches()
        setBatches(fetchedBatches)
        if (fetchedBatches.length > 0) {
          setSelectedBatch(fetchedBatches[0].batch_id)
        }
      } catch (error) {
        console.error('Failed to fetch batches:', error)
        setError('Failed to fetch batches')
      }
    }

    loadBatches()
  }, [])

  useEffect(() => {
    const loadBlogs = async () => {
      if (!selectedBatch) return

      setIsLoading(true)
      setError(null)

      try {
        const fetchedBlogs = await fetchBlogs(selectedBatch)
        setBlogs(Array.isArray(fetchedBlogs) ? fetchedBlogs : [fetchedBlogs])
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        setError('Failed to fetch blogs')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
  }, [selectedBatch])

  const handleDeleteClick = (batch: BatchTypedef) => {
    setBatchToDelete(batch)
  }

  const handleConfirmDelete = () => {
    if (batchToDelete) {
      setBatches(
        batches.filter((batch) => batch.batch_id !== batchToDelete.batch_id),
      )
      setBatchToDelete(null)
    }
  }

  const handleBatchSelect = (value: string) => {
    setSelectedBatch(value)
    console.log('Selected batch_id:', value)
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-8">
        <div className="container mx-auto flex items-center justify-between px-8">
          <div className="flex items-center space-x-6">
            <Image
              src="/assets/images/5.webp"
              alt="Barangay Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold text-black">Barangay Information</h1>
          </div>
        </div>
      </header>
      
      <section className="border-b border-gray-200 py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-10 text-4xl font-bold text-black">Barangay History</h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </section>
      
      <section className="border-b border-gray-200 py-20">
        <div className="container mx-auto px-8">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {viewMode === 'list' && (
                <Select onValueChange={handleBatchSelect} value={selectedBatch}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.batch_id} value={batch.batch_id}>
                        {batch.term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {viewMode === 'grid' && <BlogDialogForm />}
            </div>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value)}
              className="border border-gray-300"
            >
              <ToggleGroupItem
                value="list"
                aria-label="Toggle list view"
                className="px-4 py-2 transition-colors data-[state=on]:bg-gray-100"
              >
                <List className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="grid"
                aria-label="Toggle grid view"
                className="px-4 py-2 transition-colors data-[state=on]:bg-gray-100"
              >
                <Grid className="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {isLoading ? (
            <div className="py-10 text-center text-gray-600">Loading blogs...</div>
          ) : error ? (
            <div className="py-10 text-center text-red-600">Error: {error}</div>
          ) : viewMode === 'list' ? (
            <BlogDisplay viewMode={viewMode} blogs={blogs} />
          ) : (
            <div className="relative mx-auto w-full max-w-5xl">
              {batches.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No batches available.</p>
              ) : (
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {batches.map((batch) => (
                    <BatchCard
                      key={batch.batch_id}
                      batch={batch}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <section className="border-b border-gray-200 py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-10 text-4xl font-bold text-black">Vision</h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-10 text-4xl font-bold text-black">Mission</h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </section>
      
      {batchToDelete && (
        <DeleteConfirmDialog
          batch={batchToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setBatchToDelete(null)}
        />
      )}
    </main>
  )
}