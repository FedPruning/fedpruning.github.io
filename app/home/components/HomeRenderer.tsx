import { useEffect, useState } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

interface HomeRendererProps {
  frontMatter: any
  content: string
}

export default function HomeRenderer({ frontMatter, content }: HomeRendererProps) {
  const { title, subtitle } = frontMatter
  const [contentHtml, setContentHtml] = useState('')

  useEffect(() => {
    remark()
      .use(remarkGfm)
      .use(html)
      .process(content)
      .then((processed) => {
        const html = processed.toString()
        setContentHtml(html)
      })
  }, [content])

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
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight tracking-tight font-sans">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 font-semibold leading-tight mt-2 tracking-tight font-sans">
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
      </section>
    </div>
  )
}