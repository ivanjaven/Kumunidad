import { Metadata } from 'next'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { fetchPopulationList } from '@/server/queries/fetch-population-list'
import { populationSchema } from '@/data/schema'

export const metadata: Metadata = {
  title: 'Population Data Table',
  description: 'A population data table built using Tanstack Table.',
}

export default async function PopulationPage() {
  const populationData = await fetchPopulationList()
  const validatedData = populationSchema.array().parse(populationData)

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Population Data Table
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of the population!
            </p>
          </div>
        </div>
        <DataTable data={validatedData} columns={columns} />
      </div>
    </div>
  )
}
