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
      <header className="border-b border-gray-200 py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/assets/images/5.webp"
              alt="Barangay Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold text-gray-900">
              Barangay Officers
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-end">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value)}
            className="rounded-md border border-gray-200"
          >
            <ToggleGroupItem
              value="list"
              aria-label="Toggle list view"
              className="px-3 py-2 transition-colors data-[state=on]:bg-gray-100"
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              aria-label="Toggle grid view"
              className="px-3 py-2 transition-colors data-[state=on]:bg-gray-100"
            >
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {viewMode === 'list' ? (
          <BlogDisplay viewMode={viewMode} />
        ) : (
          <div className="relative mx-auto w-full max-w-3xl">
            <div className="absolute -top-14 right-0">
              <BlogDialogForm />
            </div>
            {batches.length === 0 ? (
              <p className="text-center text-gray-500">No batches available.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
