'use client'

import Image from 'next/image'
import { BlogDisplay } from '@/components/blog-display'
import { useState, useEffect } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { GridIcon, ListIcon } from 'lucide-react'
import { BatchCard } from '@/components/BatchCard'
import { BatchTypedef } from '@/lib/typedef/batch-typedef'
import { fetchBatches } from '@/server/queries/fetch-batches'
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog'

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
      <header className="bg-gray-100 py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/assets/images/5.webp"
              alt="Barangay Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Barangay Officers
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-end">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value)}
            className="rounded-md border border-gray-200 shadow-sm"
          >
            <ToggleGroupItem
              value="list"
              aria-label="Toggle list view"
              className="px-3 py-2 transition-colors data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600"
            >
              <GridIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              aria-label="Toggle grid view"
              className="px-3 py-2 transition-colors data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600"
            >
              <ListIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {viewMode === 'list' ? (
          <BlogDisplay viewMode={viewMode} />
        ) : (
          <div className="mx-auto w-full max-w-md">
            {batches.length === 0 ? (
              <p className="text-center text-gray-500">No batches available.</p>
            ) : (
              batches.map((batch) => (
                <BatchCard
                  key={batch.batch_id}
                  batch={batch}
                  onDelete={handleDeleteClick}
                />
              ))
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
