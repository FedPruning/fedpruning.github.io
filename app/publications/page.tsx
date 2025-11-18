'use client'

import { useEffect, useState } from 'react'
import { getContentBySlug } from '@/lib/markdown'
import PublicationList from './components/PublicationList'

export default function PublicationsPage() {
  const [content, setContent] = useState<{ frontMatter: any; content: string } | null>(null)

  useEffect(() => {
    getContentBySlug('publications').then(setContent)
  }, [])

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <PublicationList frontMatter={content.frontMatter} content={content.content} />
}
