import { useEffect, useState } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

interface JoinRendererProps {
  frontMatter: any
  content: string
}

export default function JoinRenderer({ frontMatter, content }: JoinRendererProps) {
  const { title, description } = frontMatter
  const [contentHtml, setContentHtml] = useState('')

  useEffect(() => {
    remark()
      .use(remarkGfm)
      .use(html)
      .process(content)
      .then((processed) => {
        setContentHtml(processed.toString())
      })
  }, [content])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  )
}
