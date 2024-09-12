import React from 'react'

interface RadioProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  disabled?: boolean
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="form-radio text-indigo-600"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-800"
      >
        {label}
      </label>
    </div>
  )
}

export default Radio
