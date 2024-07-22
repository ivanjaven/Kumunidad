import { Label } from '@/components/ui/label'

/**
 * CustomFormField component for consistent field rendering
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the form field.
 * @param {React.ReactNode} props.children - The child components to be rendered within the form field.
 * @param {string} [props.className] - Optional additional class names for styling.
 * @returns {JSX.Element} The rendered form field component.
 */
export const CustomFormField: React.FC<{
  label: string
  children: React.ReactNode
  className?: string
}> = ({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}): JSX.Element => {
  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {label}
      </Label>
      {children}
    </div>
  )
}
