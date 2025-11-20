import { useEffect, useState } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { parseNews, type NewsItem } from '@/lib/content'
import Link from 'next/link'

interface HomeRendererProps {
  frontMatter: any
  content: string
}

export default function HomeRenderer({ frontMatter, content }: HomeRendererProps) {
  const { title, subtitle } = frontMatter
  const [contentHtml, setContentHtml] = useState('')
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // Parse main content
    remark()
      .use(remarkGfm)
      .use(html)
      .process(content)
      .then((processed) => {
        setContentHtml(processed.toString())
      })

    // Fetch and parse news
    fetch('/content/news.md')
      .then(res => res.text())
      .then(markdown => {
        // Remove front matter
        const contentWithoutFrontMatter = markdown.replace(/^---[\s\S]*?---\n/, '')
        setNews(parseNews(contentWithoutFrontMatter))
      })
      .catch(err => console.error('Error loading news:', err))
  }, [content])

  // Only show first 5 news items
  const recentNews = news.slice(0, 5)

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-[190px] overflow-visible border-b border-gray-200 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/image/background.jpeg)',
          backgroundPosition: '30% 35%'
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
          <div className="text-right">
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight font-sans text-white"
            >
              {title}
            </h1>
            {subtitle && (
              <h2 
                className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mt-2 tracking-tight font-sans text-white"
              >
                {subtitle}
              </h2>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Recent News Section */}
        {recentNews.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold" style={{ color: '#C0165F' }}>
                Recent News
              </h2>
              <Link
                href="/news"
                className="px-6 py-2 rounded border-2 font-semibold transition-all hover:shadow-md"
                style={{ 
                  borderColor: '#C0165F', 
                  color: '#C0165F'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C0165F'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#C0165F'
                }}
              >
                View All News →
              </Link>
            </div>
            <div className="space-y-8">
              {recentNews.map((item, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-6 hover:border-[#C0165F] transition-colors">
                  <div className="text-sm font-semibold mb-2 text-gray-600">
                    {item.date}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold text-gray-800">
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
        )}
      </section>
    </div>
  )
}