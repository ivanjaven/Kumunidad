'use client'

import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Population } from '@/lib/typedef/population-typedef'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Population>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'street',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street" />
    ),
    cell: ({ row }) => <div>{row.getValue('street')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.getValue('gender')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'age_category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span>{row.original.age}</span>
        <Badge variant="outline">{row.getValue('age_category')}</Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'occupation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occupation" />
    ),
    cell: ({ row }) => <div>{row.getValue('occupation')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
