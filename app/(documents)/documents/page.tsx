'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DOCUMENT_CONFIG } from '@/lib/config/DOCUMENT_CONFIG'
import { ActivityLogsTypedef } from '@/lib/typedef/activity-logs-typedef'
import { fetchDocumentLogs } from '@/server/queries/fetch-documents-logs'

const ITEMS_PER_PAGE = 10
const FETCH_DELAY = 1000
const documents = DOCUMENT_CONFIG

const ActivitySkeleton = () => (
  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-64" />
    </div>
    <Skeleton className="h-6 w-24" />
  </div>
)

export default function DocumentPage() {
  const [activityLog, setActivityLog] = useState<ActivityLogsTypedef[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDocumentLogs = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY))
        const response = await fetchDocumentLogs(1, ITEMS_PER_PAGE)
        setActivityLog(response.data)
      } catch (error) {
        console.error('Failed to fetch document logs:', error)
        setError('Failed to load document logs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    loadDocumentLogs()
  }, [])

  const renderActivityItem = useCallback(
    (activity: ActivityLogsTypedef, index: number) => (
      <div
        key={activity.date + index}
        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8"
      >
        <div>
          <p className="text-sm font-medium text-black">{activity.date}</p>
          <p className="text-sm text-gray-600">{activity.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">{activity.label}</p>
        </div>
      </div>
    ),
    [],
  )

  const getDocumentLink = (docName: string) => {
    return `/documents/generate/${encodeURIComponent(docName.toLowerCase().replace(/ /g, '-'))}`
  }

  return (
    <main className="mx-auto min-h-screen bg-white p-4 md:p-8">
      <section className="mb-16">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-5xl">
            Generate Documents
          </h1>
          <p className="mb-20 mt-4 flex justify-center align-middle text-xl">
            Choose document to start generation
          </p>
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {documents.documentType.map((doc) => (
            <Link
              href={getDocumentLink(doc.name)}
              key={doc.name}
              className="flex flex-col items-center"
            >
              <div className="relative mb-4 h-36 w-36">
                <Image
                  src={doc.icon}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className="text-center text-lg font-medium text-gray-800">
                {doc.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-black">
            Recent Transactions
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {activityLog.map(renderActivityItem)}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && activityLog.length > 0 && (
            <p className="text-center text-gray-500">
              See activity logs for detailed list.
            </p>
          )}
          {!isLoading && activityLog.length === 0 && (
            <p className="text-center text-gray-500">No activities found.</p>
          )}
        </CardContent>
      </section>
    </main>
  )
}
