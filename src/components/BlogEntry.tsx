import { Link } from 'react-router-dom'
import type { Post } from '@/types'

interface BlogEntryProps {
  post: Post
  showDivider?: boolean
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogEntry({ post, showDivider = true }: BlogEntryProps) {
  return (
    <article>
      {showDivider && <hr className="border-border mb-6" />}
      <Link
        to={`/blog/${post.slug}`}
        className="group block"
      >
        <p className="text-preset-9 text-text-secondary mb-2">
          {formatDate(post.published_at)}
        </p>
        <h2 className="text-preset-6 text-text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-preset-8 text-text-secondary line-clamp-2">
          {post.description}
        </p>
      </Link>
    </article>
  )
}
