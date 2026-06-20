export interface Post {
  id: string
  slug: string
  title: string
  description: string
  content: string
  published_at: string
  tags: string[]
  featured: boolean
  created_at: string
}

export interface NewsletterFormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}
