// DataTableViewOptions.tsx
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { PrintIcon } from '@/lib/icons/PrintIcon'
import { toast } from 'sonner'
import { generatePDF } from '@/lib/pdf-generator'
import { Population } from '@/lib/typedef/population-typedef'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const handlePrint = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) {
      toast.error('Please select at least one row to print', {
        description: new Date().toLocaleString(),
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
      return
    }

    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible())
      .map((column) => column.id)

    const data = selectedRows.map((row) => row.original as Population)
    generatePDF(data, visibleColumns)
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === 'age_category' ? 'Age' : column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        className="ml-2 h-8"
        onClick={handlePrint}
      >
        <PrintIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  )
}
