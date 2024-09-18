import React from 'react'

interface DocumentLayoutProps {
  children: React.ReactNode
}

export default function DocumentLayout({ children }: DocumentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
