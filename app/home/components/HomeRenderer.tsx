import { remark } from 'remark'
import html from 'remark-html'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HomeRendererProps {
  frontMatter: any
  content: string
}

export default function HomeRenderer({ frontMatter, content }: HomeRendererProps) {
  const { title, subtitle, description, cta } = frontMatter
  const [contentHtml, setContentHtml] = useState('')

  useEffect(() => {
    remark()
      .use(html)
      .process(content)
      .then((processed) => {
        const html = processed.toString()
        setContentHtml(html)
      })
  }, [content])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="image/logo-square.png"
              alt="FedPruning Logo"
              width={130}
              height={130}
              className="h-auto w-26 md:w-32"
            />
          </div>
          
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {cta && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta.map((button: any, index: number) => (
                <a
                  key={index}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    index === 0
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                      : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
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