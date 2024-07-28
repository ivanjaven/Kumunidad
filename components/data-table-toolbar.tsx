'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { POPULATION_CONFIG } from '@/lib/config/POPULATION_CONFIG'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('street') && (
          <DataTableFacetedFilter
            column={table.getColumn('street')}
            title="Street"
            options={POPULATION_CONFIG.streetOptions}
          />
        )}
        {table.getColumn('gender') && (
          <DataTableFacetedFilter
            column={table.getColumn('gender')}
            title="Gender"
            options={POPULATION_CONFIG.genderOptions}
          />
        )}
        {table.getColumn('age_category') && (
          <DataTableFacetedFilter
            column={table.getColumn('age_category')}
            title="Age"
            options={POPULATION_CONFIG.ageCategoryOptions}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={POPULATION_CONFIG.statusOptions}
          />
        )}
        {table.getColumn('occupation') && (
          <DataTableFacetedFilter
            column={table.getColumn('occupation')}
            title="Occupation"
            options={POPULATION_CONFIG.occupationOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
