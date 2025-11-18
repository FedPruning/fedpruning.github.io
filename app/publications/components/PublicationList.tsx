import { parsePublications } from '@/lib/content'

interface PublicationListProps {
  frontMatter: any
  content: string
}

export default function PublicationList({ frontMatter, content }: PublicationListProps) {
  const { title, description } = frontMatter
  const publicationsByYear = parsePublications(content)

  const categorizePublications = (publications: any[]): { preprints: any[], published: any[] } => {
    return {
      preprints: publications.filter(pub => pub.links?.some((l: any) => l.text === 'arXiv')),
      published: publications.filter(pub => !pub.links?.some((l: any) => l.text === 'arXiv'))
    }
  }

  const getBadgeColor = (badgeType: string) => {
    const colors: { [key: string]: string } = {
      'PDF': 'bg-emerald-500 text-white hover:bg-emerald-600',
      'DOI': 'bg-blue-500 text-white hover:bg-blue-600',
      'BIB': 'bg-red-500 text-white hover:bg-red-600',
      'ABSTRACT': 'bg-amber-500 text-white hover:bg-amber-600',
      'arXiv': 'bg-[#C0165F] text-white hover:bg-[#a00d4a]',
      'Code': 'bg-gray-700 text-white hover:bg-gray-800'
    }
    return colors[badgeType] || 'bg-gray-500 text-white hover:bg-gray-600'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Publications by Year */}
      {Object.entries(publicationsByYear).map(([year, allPublications]: [string, any]) => {
        const { preprints, published } = categorizePublications(allPublications)
        
        return (
          <div key={year} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">{year}</h2>

            {/* Preprints Section */}
            {preprints.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Preprints</h3>
                <div className="bg-gray-100 rounded-lg p-8 space-y-6">
                  {preprints.map((pub, index) => (
                    <div key={index} className="pb-6 last:pb-0 last:border-b-0 border-b border-gray-300">
                      {/* Title and Citation */}
                      <div className="mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {pub.title}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {pub.authors}
                        </p>
                        {pub.venue && (
                          <p className="text-gray-600 text-sm italic">
                            {pub.venue}
                          </p>
                        )}
                      </div>

                      {pub.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pub.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-3 py-1 rounded font-semibold text-sm transition-colors ${getBadgeColor(link.text)}`}
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Abstract */}
                      {pub.abstract && (
                        <details className="mt-3 cursor-pointer">
                          <summary className="text-[#C0165F] font-semibold hover:text-[#a00d4a]">
                            ABSTRACT
                          </summary>
                          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                            {pub.abstract}
                          </p>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Published Papers Section */}
            {published.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Published papers</h3>
                <div className="bg-gray-100 rounded-lg p-8 space-y-6">
                  {published.map((pub, index) => (
                    <div key={index} className="pb-6 last:pb-0 last:border-b-0 border-b border-gray-300">
                      {/* Title and Citation */}
                      <div className="mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {pub.title}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {pub.authors}
                        </p>
                        {pub.venue && (
                          <p className="text-gray-600 text-sm italic">
                            {pub.venue}
                          </p>
                        )}
                      </div>

                      {/* Colored Badges */}
                      {pub.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pub.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-3 py-1 rounded font-semibold text-sm transition-colors ${getBadgeColor(link.text)}`}
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Abstract */}
                      {pub.abstract && (
                        <details className="mt-3 cursor-pointer">
                          <summary className="text-[#C0165F] font-semibold hover:text-[#a00d4a]">
                            ABSTRACT
                          </summary>
                          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                            {pub.abstract}
                          </p>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
