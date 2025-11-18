'use client'

import { useEffect, useState } from 'react'
import { getContentBySlug } from '@/lib/markdown'
import MemberGrid from './components/MemberGrid'

export default function MembersPage() {
  const [content, setContent] = useState<{ frontMatter: any; content: string } | null>(null)

  useEffect(() => {
    getContentBySlug('members').then(setContent)
  }, [])

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <MemberGrid frontMatter={content.frontMatter} content={content.content} />
}
