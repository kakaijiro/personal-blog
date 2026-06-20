import { Link } from 'react-router-dom'
import { BlogEntry } from '@/components/BlogEntry'
import { SocialIcons } from '@/components/SocialIcons'
import { useRecentPosts } from '@/hooks/usePosts'
import avatarImg from '@/assets/images/image-avatar.jpg'

export function HomePage() {
  const { data: recentPosts, loading, error } = useRecentPosts(5)

  return (
    <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Hero / Greeting */}
      <section className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-12">
        <img
          src={avatarImg}
          alt="Paulina"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h1
            className="text-preset-2 text-text-primary mb-3 w-fit"
            style={{
              background: 'linear-gradient(transparent 78%, hsl(206 95% 78% / 0.45) 78%)',
            }}
          >
            Hi, I'm Paulina ✌️
          </h1>
          <p className="text-preset-7 text-text-secondary max-w-xl">
            Welcome to my corner of the internet! I'm a front-end developer passionate about
            building beautiful, accessible web experiences. Here I share my coding journey,
            book recommendations, and outdoor adventures.
          </p>
          <SocialIcons className="mt-4" />
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-preset-5 text-text-primary">Recent Posts</h2>
          <Link
            to="/blog"
            className="text-preset-8 text-accent hover:opacity-80 transition-opacity"
          >
            View all →
          </Link>
        </div>

        {loading && (
          <p className="text-preset-8 text-text-secondary">Loading posts…</p>
        )}
        {error && (
          <p className="text-preset-8 text-red-500">Failed to load posts.</p>
        )}
        {!loading && !error && (
          <div className="flex flex-col gap-6">
            {recentPosts.map((post, i) => (
              <BlogEntry key={post.slug} post={post} showDivider={i > 0} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
