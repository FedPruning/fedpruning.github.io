'use client'

import { useEffect, useState } from 'react'
import { getContentBySlug } from '@/lib/markdown'
import JoinRenderer from './components/JoinRenderer'

export default function JoinPage() {
  const [content, setContent] = useState<{ frontMatter: any; content: string } | null>(null)

  useEffect(() => {
    getContentBySlug('join').then(setContent)
  }, [])

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <JoinRenderer frontMatter={content.frontMatter} content={content.content} />
}
