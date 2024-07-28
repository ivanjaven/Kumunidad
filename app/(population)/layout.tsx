interface PopulationLayoutProps {
  children: React.ReactNode
}

export default async function PopulationLayout({
  children,
}: PopulationLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
