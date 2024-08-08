'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ActivityLogsTypedef } from '@/lib/typedef/activity-logs-typedef'
import { fetchActivityLogs } from '@/server/queries/fetch-activity-logs'
import { Skeleton } from '@/components/ui/skeleton'

const ITEMS_PER_PAGE = 25
const FETCH_DELAY = 2000

// Skeleton component for loading state
const ActivitySkeleton = () => (
  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 md:p-6 lg:p-8">
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-64" />
    </div>
    <Skeleton className="h-6 w-24" />
  </div>
)

export default function ActivityLogPage() {
  const [activityLog, setActivityLog] = useState<ActivityLogsTypedef[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastActivityElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore],
  )

  // Fetch activity logs
  useEffect(() => {
    const loadActivityLogs = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY))

        const response = await fetchActivityLogs(page, ITEMS_PER_PAGE)
        setActivityLog((prevLogs) => [...prevLogs, ...response.data])
        setHasMore(response.data.length === ITEMS_PER_PAGE)
      } catch (error) {
        console.error('Failed to fetch activity logs:', error)
        setError('Failed to load activity logs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadActivityLogs()
  }, [page])

  // Render activity item
  const renderActivityItem = useCallback(
    (activity: ActivityLogsTypedef, index: number) => (
      <div
        key={activity.date + index}
        ref={index === activityLog.length - 1 ? lastActivityElementRef : null}
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
    [activityLog.length, lastActivityElementRef],
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Card className="relative flex-1 p-6 md:p-8 lg:p-10">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-black">Activity Logs</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {activityLog.map(renderActivityItem)}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !hasMore && activityLog.length > 0 && (
            <p className="text-center text-gray-500">
              No more activities to load.
            </p>
          )}
          {!isLoading && !hasMore && activityLog.length === 0 && (
            <p className="text-center text-gray-500">No activities found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
