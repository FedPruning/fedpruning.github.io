import { parseMemberGroups } from '@/lib/content'
import Image from 'next/image'

interface MemberGridProps {
  frontMatter: any
  content: string
}

export default function MemberGrid({ frontMatter, content }: MemberGridProps) {
  const { title, description } = frontMatter
  const memberGroups = parseMemberGroups(content)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {/* Member Groups */}
      {memberGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {group.title}
          </h2>

          <div className="space-y-6">
            {group.members.map((member, memberIndex) => (
              <div
                key={memberIndex}
                className="bg-gray-50 rounded-lg p-6 flex gap-6 items-start"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded w-24 h-24 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">No photo</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>

                  {/* Position */}
                  {member.position && (
                    <p className="text-sm font-semibold text-[#C0165F] mb-1">
                      {member.position}
                    </p>
                  )}

                  {/* Institution */}
                  {member.institution && (
                    <p className="text-sm text-gray-600 mb-3">
                      {member.institution}
                    </p>
                  )}

                  {/* Year (for students) */}
                  {member.year && (
                    <p className="text-sm text-gray-600 mb-3">
                      {member.year}
                    </p>
                  )}

                  {/* Focus/Thesis/Current */}
                  {member.focus && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Focus:</span> {member.focus}
                    </p>
                  )}
                  {member.thesis && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Thesis:</span> {member.thesis}
                    </p>
                  )}
                  {member.current && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Current:</span> {member.current}
                    </p>
                  )}

                  {/* Contact Links */}
                  {(member.email || member.homepage) && (
                    <div className="flex gap-3 mt-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-[#C0165F] hover:text-[#a00d4a] text-sm font-semibold"
                        >
                          Email
                        </a>
                      )}
                      {member.homepage && (
                        <a
                          href={member.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C0165F] hover:text-[#a00d4a] text-sm font-semibold"
                        >
                          Homepage
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
