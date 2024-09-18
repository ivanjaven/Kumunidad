import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BatchTypedef } from '@/lib/typedef/batch-typedef'

interface BatchCardProps {
  batch: BatchTypedef
  onDelete: (batch: BatchTypedef) => void
}

export const BatchCard = ({ batch, onDelete }: BatchCardProps) => (
  <Card className="mb-2 flex items-center justify-between border border-gray-200 bg-white p-4">
    <span className="text-lg font-semibold text-gray-900">{batch.term}</span>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDelete(batch)}
      className="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Delete</span>
    </Button>
  </Card>
)
