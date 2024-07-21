interface ResidentLayoutProps {
  children: React.ReactNode
}

export default async function ResidentLayout({
  children,
}: ResidentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
