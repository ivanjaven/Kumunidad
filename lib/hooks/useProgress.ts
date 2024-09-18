import { useState, useCallback } from 'react'

export const useProgress = (initialProgress = 0) => {
  const [progress, setProgress] = useState(initialProgress)

  const updateProgress = useCallback(
    (newProgress: number | ((prev: number) => number)) => {
      setProgress((prev) => {
        if (typeof newProgress === 'function') {
          return Math.min(100, Math.max(0, newProgress(prev)))
        }
        return Math.min(100, Math.max(0, newProgress))
      })
    },
    [],
  )

  const resetProgress = useCallback(() => {
    setProgress(0)
  }, [])

  return { progress, updateProgress, resetProgress }
}
