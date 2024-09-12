import React from 'react'

interface RadioGroupProps {
  name: string
  options: { label: string; value: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="form-radio text-indigo-600"
          />
          <label
            htmlFor={option.value}
            className="ml-2 text-sm font-medium text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
