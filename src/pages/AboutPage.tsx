import { SocialIcons } from '@/components/SocialIcons'
import workspaceLargeImg from '@/assets/images/image-workspace-large.jpg'
import workspaceSmallImg from '@/assets/images/image-workspace-small.jpg'

const favoriteBooks = [
  { title: '"The Pragmatic Programmer"', authors: 'Andrew Hunt and David Thomas', note: 'for helpful insights into software development' },
  { title: '"Ready Player One"', authors: 'Ernest Cline', note: 'for some futuristic escapism' },
  { title: '"The Hobbit"', authors: 'J.R.R. Tolkien', note: 'for a bit of fantasy fun' },
  { title: '"Educated"', authors: 'Tara Westover', note: 'for incredible inspiration' },
]

export function AboutPage() {
  return (
    <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-preset-2 text-text-primary mb-8">About Me</h1>

        <div className="space-y-5 text-preset-7 text-text-secondary">
          <p>
            Hi, I'm Paulina! Ever since I can remember, I've had a passion for creativity and
            problem-solving. That's what led me to the world of front-end web development.
            There's something magical about seeing an idea come to life in the browser—whether
            it's a simple layout experiment or a complex interface for a bigger project.
          </p>
          <p>
            When I'm not coding, I love getting lost in a good book. My taste is pretty eclectic:
            I'll happily read everything from fantasy novels to biographies of tech pioneers.
            Reading helps me unwind and often sparks new ideas for my coding projects.
          </p>
          <p>
            Another big passion of mine is the great outdoors. Hiking allows me to disconnect
            from the digital world and reconnect with nature. I love challenging hikes with
            rewarding views at the top. And if I'm not on the trails, you might catch me rock
            climbing. The combination of mental focus and physical endurance is a perfect parallel
            to tackling tough coding challenges!
          </p>
        </div>

        {/* Favorite books */}
        <section className="mt-10">
          <h2 className="text-preset-5 text-text-primary mb-4">Some of my favorite books:</h2>
          <ul className="space-y-2">
            {favoriteBooks.map(({ title, authors, note }) => (
              <li key={title} className="text-preset-7 text-text-secondary">
                <span className="italic">{title}</span> by {authors}{' '}
                <span className="text-text-secondary/70">({note})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Workspace image */}
        <section className="mt-10">
          <p className="text-preset-7 text-text-secondary mb-6">
            I absolutely love my workspace as a place that inspires me to do my best work,
            so I thought I'd share it with you:
          </p>
          <picture>
            <source media="(min-width: 768px)" srcSet={workspaceLargeImg} />
            <img
              src={workspaceSmallImg}
              alt="My workspace setup"
              className="w-full rounded-xl object-cover"
            />
          </picture>
        </section>

        <p className="mt-8 text-preset-7 text-text-secondary">
          I hope this blog not only documents my growth but also helps others see that coding
          can be for everyone. Thanks for joining me on this journey!
        </p>

        {/* Follow section */}
        <section className="mt-10 pt-8 border-t border-border">
          <h2 className="text-preset-5 text-text-primary mb-4">Follow me</h2>
          <SocialIcons />
        </section>
      </div>
    </main>
  )
}
