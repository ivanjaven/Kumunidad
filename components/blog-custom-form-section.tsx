import { BlogAddCard } from '@/components/blog-add-card'
import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import { BlogFormField } from '@/components/blog-form-field'

interface BlogCustomFormSectionProps {
  title: string
  infoText: string
  officials: BlogTypedef[]
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>> | null
  addNewRole: Role | null
}

export function BlogCustomFormSection({
  title,
  infoText,
  officials,
  setOfficials,
  addNewRole,
}: BlogCustomFormSectionProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="mb-6 text-gray-700">
        <p className="text-sm">{infoText}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {officials.map((official, index) => (
          <BlogFormField
            key={`${official.role}-${index}`}
            official={official}
            index={index}
            setOfficials={setOfficials!}
          />
        ))}
        {addNewRole && setOfficials && (
          <BlogAddCard role={addNewRole} setOfficials={setOfficials} />
        )}
      </div>
    </div>
  )
}
