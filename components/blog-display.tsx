import { BlogTypedef, Role } from '@/lib/typedef/blog-typedef'
import BlogCard from '@/components/blog-card'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'

interface BlogDisplayProps { 
  viewMode: string
  blogs: BlogTypedef[]
}

export function BlogDisplay({ viewMode, blogs }: BlogDisplayProps) {
  const renderSection = (label: string, roles: Role[]) => {
    const sectionBlogs = blogs.filter((blog) => roles.includes(blog.role))
    if (sectionBlogs.length === 0) return null

    return (
      <section key={label} className="mb-12">
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold">
          {label}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sectionBlogs.map((blog, index) => (
            <BlogCard key={`${blog.role}-${index}`} blog={blog} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {renderSection(
        'Executive Officials',
        BLOG_CONFIG.OFFICIALS.EXECUTIVE.map(
          (official) => official.role as Role,
        ),
      )}
      {renderSection('Barangay Kagawad', ['Barangay Kagawad'])}
      {renderSection('Lupong Tagapamayapa', ['Lupong Tagapamayapa'])}
      {renderSection(
        'SK Executive Officials',
        BLOG_CONFIG.OFFICIALS.SK_EXECUTIVE.map(
          (official) => official.role as Role,
        ),
      )}
      {renderSection('SK Kagawad', ['SK Kagawad'])}
      {renderSection('Barangay Tanod', ['Barangay Tanod'])}
    </div>
  )
}