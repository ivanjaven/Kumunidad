import { useCallback } from 'react'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'

export function useOfficialCard(
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>> | null,
) {
  const handleImageUpload = useCallback(
    (role: Role, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && setOfficials) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setOfficials((prev) =>
            prev.map((official, i) =>
              i === index || official.role === role
                ? { ...official, image: e.target?.result as string }
                : official,
            ),
          )
        }
        reader.readAsDataURL(file)
      }
    },
    [setOfficials],
  )

  const handleNameChange = useCallback(
    (role: Role, index: number, name: string) => {
      if (setOfficials) {
        setOfficials((prev) =>
          prev.map((official, i) =>
            i === index || official.role === role
              ? { ...official, name }
              : official,
          ),
        )
      }
    },
    [setOfficials],
  )

  const removeOfficial = useCallback(
    (role: Role, index: number) => {
      if (setOfficials) {
        setOfficials((prev) => prev.filter((_, i) => i !== index))
      }
    },
    [setOfficials],
  )

  return { handleImageUpload, handleNameChange, removeOfficial }
}
