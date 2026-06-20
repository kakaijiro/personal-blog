import { NewsletterForm } from '@/components/NewsletterForm'

export function NewsletterPage() {
  return (
    <main className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-preset-2 text-text-primary mb-4">Newsletter</h1>

        <p className="text-preset-7 text-text-secondary mb-8">
          Want to stay updated on my latest articles, coding tutorials, and personal adventures?
          Sign up for my newsletter! It's a simple way to keep track of new posts and occasional
          coding tips I discover. Just drop your email in the sign-up box, and I'll send you
          updates whenever there's something new to share.
        </p>

        <p className="text-preset-7 text-text-secondary mb-8">
          I'd love to have you along for the ride and also hear about your own journey!
        </p>

        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <NewsletterForm />
        </div>
      </div>
    </main>
  )
}
