'use client'

import { useEffect, useState } from 'react'
import { getContentBySlug } from '@/lib/markdown'
import NewsRenderer from './components/NewsRenderer'

export default function NewsPage() {
  const [content, setContent] = useState<{ frontMatter: any; content: string } | null>(null)

  useEffect(() => {
    getContentBySlug('news').then(setContent)
  }, [])

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <NewsRenderer frontMatter={content.frontMatter} content={content.content} />
}