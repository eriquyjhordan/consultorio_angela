'use client'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://dykynekvohjggobdrztx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5a3luZWt2b2hqZ2dvYmRyenR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwMjkxNzEsImV4cCI6MjAwNDYwNTE3MX0.XJl0ZUUuwghvHgop1uZaS89PnDy42BCxtalRU8iN4b0',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }
  }
)
