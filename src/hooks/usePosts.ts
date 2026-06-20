import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/types'

interface PostsState {
  data: Post[]
  loading: boolean
  error: string | null
}

interface PostState {
  data: Post | null
  loading: boolean
  error: string | null
}

export function useAllPosts(): PostsState {
  const [state, setState] = useState<PostsState>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase
      .rpc('get_all_posts')
      .then(({ data, error }) => {
        if (error) setState({ data: [], loading: false, error: error.message })
        else setState({ data: (data as Post[]) ?? [], loading: false, error: null })
      })
  }, [])

  return state
}

export function useRecentPosts(count: number = 5): PostsState {
  const [state, setState] = useState<PostsState>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase
      .rpc('get_recent_posts', { p_count: count })
      .then(({ data, error }) => {
        if (error) setState({ data: [], loading: false, error: error.message })
        else setState({ data: (data as Post[]) ?? [], loading: false, error: null })
      })
  }, [count])

  return state
}

export function usePostBySlug(slug: string): PostState {
  const [state, setState] = useState<PostState>({ data: null, loading: true, error: null })

  useEffect(() => {
    if (!slug) return
    supabase
      .rpc('get_post_by_slug', { p_slug: slug })
      .single()
      .then(({ data, error }) => {
        if (error) setState({ data: null, loading: false, error: error.message })
        else setState({ data: data as Post, loading: false, error: null })
      })
  }, [slug])

  return state
}
