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
  const [openBibtex, setOpenBibtex] = useState<Record<string, boolean>>({})
  const [copiedBib, setCopiedBib] = useState<string | null>(null)

  const toggleAbstract = (key: string) => {
    setOpenAbstracts(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleBibtex = (key: string) => {
    setOpenBibtex(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyBibTeX = async (bibText: string, key: string) => {
    try {
      await navigator.clipboard.writeText(bibText)
      setCopiedBib(key)
      setTimeout(() => setCopiedBib(null), 2000)
    } catch (err) {
      console.error('Failed to copy BibTeX:', err)
    }
  }

  const getBadgeColor = (badgeType: string) => {
    const colors: { [key: string]: string } = {
      PDF: 'border border-transparent bg-[#1ABC9C] text-white hover:bg-[#18a385]',
      Code: 'border border-transparent bg-gray-700 text-white hover:bg-gray-800'
    }
    return colors[badgeType] || 'border border-transparent bg-gray-500 text-white hover:bg-gray-600'
  }

  const buttonBase =
    'inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

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
      {Object.entries(publicationsBySection).map(([sectionTitle, publications]) => {
        if (!publications || publications.length === 0) {
          return null
        }

        return (
          <section key={sectionTitle} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {sectionTitle}
            </h2>

            <div className="space-y-6">
              {publications.map(pub => {
                const abstractKey = `${sectionTitle}-${pub.id}`
                const bibtexKey = `${abstractKey}-bibtex`
                const isAbstractOpen = Boolean(openAbstracts[abstractKey])
                const isBibtexOpen = Boolean(openBibtex[bibtexKey])
                const isCopied = copiedBib === bibtexKey

                return (
                  <article
                    key={abstractKey}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-gray-700 sm:mt-1">
                        {pub.id}
                      </span>

                      <div className="flex-1 min-w-0 space-y-4">
                        <p className="text-base leading-relaxed text-gray-800">
                          {pub.citation}
                        </p>

                        {(pub.links.length > 0 || pub.abstract || pub.bibtex) && (
                          <div className="flex flex-wrap items-center gap-2">
                            {/* 只显示 PDF 和 Code 链接 */}
                            {pub.links.map((link, linkIndex) => {
                              if (link.text !== 'PDF' && link.text !== 'Code') return null
                              
                              return (
                                <a
                                  key={`${abstractKey}-link-${linkIndex}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ${getBadgeColor(link.text)}`}
                                >
                                  {link.text}
                                </a>
                              )
                            })}

                            {/* BIB 按钮 */}
                            {pub.bibtex && (
                              <button
                                type="button"
                                onClick={() => toggleBibtex(bibtexKey)}
                                className={`${buttonBase} bg-[#E74C3C] text-white hover:bg-[#cf3b2a] focus-visible:outline-[#cf3b2a] ${isBibtexOpen ? 'bg-[#cf3b2a]' : ''}`}
                              >
                                BIB
                              </button>
                            )}

                            {/* Abstract 按钮 */}
                            {pub.abstract && (
                              <button
                                type="button"
                                onClick={() => toggleAbstract(abstractKey)}
                                className={`${buttonBase} bg-[#F39C12] text-white hover:bg-[#d8890f] focus-visible:outline-[#d8890f] ${isAbstractOpen ? 'bg-[#d8890f]' : ''}`}
                              >
                                Abstract
                              </button>
                            )}
                          </div>
                        )}

                        {/* BibTeX Expansion */}
                        {pub.bibtex && isBibtexOpen && (
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                            <div className="relative">
                              <pre className="text-xs bg-white rounded-lg p-4 pr-24 overflow-x-auto border border-gray-200 max-w-full">
                                <code className="text-gray-800 font-mono block">{pub.bibtex}</code>
                              </pre>
                              <button
                                type="button"
                                onClick={() => copyBibTeX(pub.bibtex!, bibtexKey)}
                                className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                              >
                                {isCopied ? (
                                  <>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Abstract Expansion */}
                        {pub.abstract && isAbstractOpen && (
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-800 shadow-sm">
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
        )
      })}
    </div>
  )
}