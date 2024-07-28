'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

import { DataTableFacetedFilter } from './data-table-faceted-filter'

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
]

const ageCategoryOptions = [
  { label: 'New born', value: 'New born' },
  { label: 'Child', value: 'Child' },
  { label: 'Teenager', value: 'Teenager' },
  { label: 'Adult', value: 'Adult' },
  { label: 'Senior Citizen', value: 'Senior Citizen' },
]

const occupationOptions = [
  { label: 'Employed', value: 'Employed' },
  { label: 'Unemployed', value: 'Unemployed' },
]

const statusOptions = [
  { label: 'Single', value: 'Single' },
  { label: 'Married', value: 'Married' },
  { label: 'Divorced', value: 'Divorced' },
  { label: 'Widowed', value: 'Widowed' },
]

const streetOptions = [
  { label: 'Purok 1', value: 'Purok 1' },
  { label: 'Purok 2', value: 'Purok 2' },
  { label: 'Purok 3', value: 'Purok 3' },
  { label: 'Purok 4', value: 'Purok 4' },
  { label: 'Purok 5', value: 'Purok 5' },
  { label: 'Purok 6', value: 'Purok 6' },
]

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
            options={streetOptions}
          />
        )}
        {table.getColumn('gender') && (
          <DataTableFacetedFilter
            column={table.getColumn('gender')}
            title="Gender"
            options={genderOptions}
          />
        )}
        {table.getColumn('age_category') && (
          <DataTableFacetedFilter
            column={table.getColumn('age_category')}
            title="Age"
            options={ageCategoryOptions}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statusOptions}
          />
        )}
        {table.getColumn('occupation') && (
          <DataTableFacetedFilter
            column={table.getColumn('occupation')}
            title="Occupation"
            options={occupationOptions}
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
