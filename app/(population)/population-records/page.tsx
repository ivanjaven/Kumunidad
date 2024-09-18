'use client'

import React, { useEffect, useState } from 'react'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { fetchPopulationList } from '@/server/queries/fetch-population-list'
import { PopulationTypedef } from '@/lib/typedef/population-typedef'
import { z } from 'zod'
import { DataTableSkeleton } from '@/components/data-table-skeleton'

type PopulationData = z.infer<typeof PopulationTypedef>

export default function PopulationPage() {
  const [populationData, setPopulationData] = useState<PopulationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPopulationList()
        const validatedData = PopulationTypedef.array().parse(data)
        setPopulationData(validatedData)
      } catch (error) {
        console.error('Error fetching population data:', error)
        setError('Failed to fetch population data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Population Data Table
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of the Records!
              </p>
            </div>
          </div>
          {loading ? (
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={1}
              cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <DataTable data={populationData} columns={columns} />
          )}
        </div>
      </div>
    </>
  )
}
