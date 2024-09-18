import { useState } from 'react'
import { BatchTypedef } from '@/lib/typedef/batch-typedef'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'

interface DeleteConfirmDialogProps {
  batch: BatchTypedef
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmDialog({
  batch,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  const [inputTerm, setInputTerm] = useState('')

  const handleConfirm = () => {
    if (inputTerm === batch.term) {
      onConfirm()
    }
  }

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this batch? This action cannot be
            undone.
            <br />
            Batch ID: {batch.batch_id}
            <br />
            To confirm, please type the term &quot;{batch.term}&quot; below:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type="text"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
          placeholder="Type the term here"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={inputTerm !== batch.term}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
