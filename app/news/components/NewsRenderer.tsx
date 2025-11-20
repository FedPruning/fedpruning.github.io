import { useEffect, useState } from 'react'
import { parseNews, type NewsItem } from '@/lib/content'

interface NewsRendererProps {
  frontMatter: any
  content: string
}

export default function NewsRenderer({ frontMatter, content }: NewsRendererProps) {
  const { title, description } = frontMatter
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    setNews(parseNews(content))
  }, [content])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-primary">
          {title || 'News'}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* All News */}
      <div className="space-y-8">
        {news.map((item, index) => (
          <div key={index} className="border-l-4 border-gray-300 pl-6 py-2 hover:border-[#C0165F] transition-colors">
            <div className="text-sm font-semibold mb-2 text-gray-600">
              {item.date}
            </div>
            <div className="mb-2">
              <span className="font-bold text-lg text-gray-800">
                {item.title}
              </span>
              <span className="text-gray-700"> {item.description}</span>
            </div>
            {item.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {item.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    className="text-sm px-3 py-1 rounded border transition-colors"
                    style={{ 
                      borderColor: '#9CA3AF',
                      color: '#374151'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#C0165F'
                      e.currentTarget.style.color = '#C0165F'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#9CA3AF'
                      e.currentTarget.style.color = '#374151'
                    }}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}