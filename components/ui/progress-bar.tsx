import React from 'react'

interface ProgressBarProps {
  title: string
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center text-sm font-medium text-gray-600">
          {progress}%
        </p>
      </div>
    </div>
  )
}

export default ProgressBar
