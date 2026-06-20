import { useParams, Link, Navigate } from 'react-router-dom'
import { BlogContent } from '@/components/BlogContent'
import { usePostBySlug, useAllPosts } from '@/hooks/usePosts'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, loading, error } = usePostBySlug(slug ?? '')
  const { data: allPosts } = useAllPosts()

  if (loading) {
    return (
      <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-preset-8 text-text-secondary">Loading…</p>
        </div>
      </main>
    )
  }

  if (error || !post) return <Navigate to="/blog" replace />

  const idx = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost = idx > 0 ? allPosts[idx - 1] : null

  return (
    <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-preset-8 text-accent hover:opacity-80 transition-opacity mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <p className="text-preset-9 text-text-secondary mb-3">
            {formatDate(post.published_at)}
          </p>
          <h1 className="text-preset-2 text-text-primary mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-preset-7 text-text-secondary">
            {post.description}
          </p>
        </header>

        <hr className="border-border mb-8" />

        {/* Article content */}
        <BlogContent content={post.content} />

        {/* Prev / Next navigation */}
        <nav className="mt-12 pt-8 border-t border-border flex justify-between gap-4">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className="flex-1 text-left group">
              <p className="text-preset-9 text-text-secondary mb-1">← Previous</p>
              <p className="text-preset-8 text-text-primary group-hover:text-accent transition-colors leading-snug">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className="flex-1 text-right group">
              <p className="text-preset-9 text-text-secondary mb-1">Next →</p>
              <p className="text-preset-8 text-text-primary group-hover:text-accent transition-colors leading-snug">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    </main>
  )
}
