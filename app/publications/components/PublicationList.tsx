import { useState } from 'react'

import { parsePublications } from '@/lib/content'

interface PublicationListProps {
  frontMatter: any
  content: string
}

export default function PublicationList({ frontMatter, content }: PublicationListProps) {
  const { title, description } = frontMatter
  const publicationsBySection = parsePublications(content)
  const [openAbstracts, setOpenAbstracts] = useState<Record<string, boolean>>({})

  const toggleAbstract = (key: string) => {
    setOpenAbstracts(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const getBadgeColor = (badgeType: string) => {
    const colors: { [key: string]: string } = {
      PDF: 'border border-transparent bg-[#1ABC9C] text-white hover:bg-[#18a385]',
      DOI: 'border border-transparent bg-[#2C4E77] text-white hover:bg-[#244062]',
      BIB: 'border border-transparent bg-[#E74C3C] text-white hover:bg-[#cf3b2a]',
      ABSTRACT: 'border border-transparent bg-[#F39C12] text-white hover:bg-[#d8890f]',
      arXiv: 'border border-transparent bg-[#C0165F] text-white hover:bg-[#a00d4a]',
      Code: 'border border-transparent bg-gray-700 text-white hover:bg-gray-800'
    }
    return colors[badgeType] || 'border border-transparent bg-gray-500 text-white hover:bg-gray-600'
  }

  const abstractButtonBase =
    'inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold shadow-sm transition-colors bg-[#F39C12] text-white hover:bg-[#d8890f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8890f]'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-primary">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Publications by section */}
      {Object.entries(publicationsBySection).map(([sectionTitle, publications]) => (
        <section key={sectionTitle} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {sectionTitle}
          </h2>

          <div className="space-y-6">
            {publications.map(pub => {
              const abstractKey = `${sectionTitle}-${pub.id}`
              const isAbstractOpen = Boolean(openAbstracts[abstractKey])

              return (
                <article
                  key={abstractKey}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-gray-700 sm:mt-1">
                      {pub.id}
                    </span>

                    <div className="flex-1 space-y-4">
                      <p className="text-base leading-relaxed text-gray-800">
                        {pub.citation}
                      </p>

                      {(pub.links.length > 0 || pub.abstract) && (
                        <div className="flex flex-wrap items-center gap-2">
                          {pub.links.map((link, linkIndex) => (
                            <a
                              key={`${abstractKey}-link-${linkIndex}`}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ${getBadgeColor(link.text)}`}
                            >
                              {link.text}
                            </a>
                          ))}

                          {pub.abstract && (
                            <button
                              type="button"
                              onClick={() => toggleAbstract(abstractKey)}
                              className={`${abstractButtonBase} ${isAbstractOpen ? 'bg-[#d8890f]' : ''}`}
                            >
                              Abstract
                            </button>
                          )}
                        </div>
                      )}

                      {pub.abstract && isAbstractOpen && (
                        <div className="rounded-xl border border-gray-200 bg-gray-100 p-5 text-gray-800 shadow-sm">
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {pub.abstract}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
