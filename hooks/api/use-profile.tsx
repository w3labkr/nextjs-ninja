'use client'

import useSWR from 'swr'
import { Tables } from '@/types/supabase'

type FetchData =
  | { data: Tables<'profiles'>; error: null }
  | { data: null; error: Error }

export type Profile = Tables<'profiles'>

export function useProfile(id: string | null) {
  const fetchUrl = id ? `/api/v1/profile/${id}` : null
  const {
    data: api,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<FetchData, Error>(fetchUrl)

  return {
    data: api?.data,
    error: error ?? api?.error,
    isLoading,
    isValidating,
    mutate,
  }
}
