import { Link } from 'react-router-dom'
import { BlogEntry } from '@/components/BlogEntry'
import { useAllPosts } from '@/hooks/usePosts'
import avatarImg from '@/assets/images/image-avatar.jpg'

export function BlogPage() {
  const { data: allPosts, loading, error } = useAllPosts()

  return (
    <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Main — Blog list */}
        <section className="flex-1 min-w-0">
          <h1 className="text-preset-2 text-text-primary mb-8">Blog</h1>

          {loading && (
            <p className="text-preset-8 text-text-secondary">Loading posts…</p>
          )}
          {error && (
            <p className="text-preset-8 text-red-500">Failed to load posts.</p>
          )}
          {!loading && !error && (
            <div className="flex flex-col gap-6">
              {allPosts.map((post, i) => (
                <BlogEntry key={post.slug} post={post} showDivider={i > 0} />
              ))}
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          {/* About mini card */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-6">
            <img
              src={avatarImg}
              alt="Paulina"
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <h2 className="text-preset-6 text-text-primary font-semibold mb-2">About Paulina</h2>
            <p className="text-preset-8 text-text-secondary mb-4">
              Front-end developer sharing my coding journey, book picks, and outdoor adventures.
            </p>
            <Link
              to="/about"
              className="
                inline-block px-6 py-2.5 rounded-lg
                bg-text-primary text-bg text-preset-8 font-semibold
                hover:opacity-90 transition-opacity
              "
            >
              Read more →
            </Link>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <h2 className="text-preset-6 text-text-primary font-semibold mb-2">Stay updated</h2>
            <p className="text-preset-8 text-text-secondary mb-4">
              Get notified whenever I publish something new.
            </p>
            <Link
              to="/newsletter"
              className="
                inline-block px-6 py-2.5 rounded-lg
                bg-text-primary text-bg text-preset-8 font-semibold
                hover:opacity-90 transition-opacity
              "
            >
              Subscribe →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
