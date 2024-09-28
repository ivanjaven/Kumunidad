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

export default function Home() {
  const [viewMode, setViewMode] = useState('list')
  const [batches, setBatches] = useState<BatchTypedef[]>([])
  const [batchToDelete, setBatchToDelete] = useState<BatchTypedef | null>(null)

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const fetchedBatches = await fetchBatches()
        setBatches(fetchedBatches)
      } catch (error) {
        console.error('Failed to fetch batches:', error)
      }
    }

    loadBatches()
  }, [])

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

  return (
    <main className="min-h-screen bg-white">
      <header className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Image
              src="/assets/images/5.webp"
              alt="Barangay Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold">Barangay Information</h1>
          </div>
        </div>
      </header>
      
      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-4xl font-bold">Barangay History</h2>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </section>
      
      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-end">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value)}
              className="border border-gray-200"
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
          {viewMode === 'list' ? (
            <BlogDisplay viewMode={viewMode} />
          ) : (
            <div className="relative mx-auto w-full max-w-4xl">
              <div className="absolute -top-16 right-0">
                <BlogDialogForm />
              </div>
              {batches.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No batches available.</p>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      
      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-4xl font-bold">Vision</h2>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-4xl font-bold">Mission</h2>
          <p className="text-lg leading-relaxed">
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