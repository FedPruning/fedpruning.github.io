'use client'

import { useEffect, useState } from 'react'
import { getContentBySlug } from '@/lib/markdown'
import HomeRenderer from './components/HomeRenderer'

export default function HomePage() {
  const [content, setContent] = useState<{ frontMatter: any; content: string } | null>(null)

  useEffect(() => {
    getContentBySlug('home').then(setContent)
  }, [])

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <HomeRenderer frontMatter={content.frontMatter} content={content.content} />
}
