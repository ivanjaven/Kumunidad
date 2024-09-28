interface UsersLayoutProps {
  children: React.ReactNode
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
