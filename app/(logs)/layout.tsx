interface ActivityLayoutProps {
  children: React.ReactNode
}

export default async function ActivityLayout({
  children,
}: ActivityLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
