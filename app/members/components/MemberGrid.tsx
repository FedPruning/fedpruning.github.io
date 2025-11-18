import { parseMemberGroups } from '@/lib/content'
import Image from 'next/image'

const iconClasses = 'h-4 w-4'

function MailIcon() {
  return (
    <svg
      className={iconClasses}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm16 0-8 6-8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg
      className={iconClasses}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21c5.523 0 10-4.477 10-10S17.523 1 12 1 2 5.477 2 11s4.477 10 10 10zm0 0c2.761 0 5-4.477 5-10S14.761 1 12 1m0 20c-2.761 0-5-4.477-5-10S9.239 1 12 1m-9 10h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

          <div className="grid gap-6 md:grid-cols-2">
            {group.members.map((member, memberIndex) => (
              <div
                key={memberIndex}
                className="flex h-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:flex-row"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={member.image || '/placeholder-user.jpg'}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="h-24 w-24 rounded-xl object-cover ring-1 ring-gray-100 sm:h-28 sm:w-28"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  {/* Name */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>

                    {(member.position || member.institution || member.year) && (
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {member.position && (
                          <p className="font-semibold text-[#C0165F]">
                            {member.position}
                          </p>
                        )}
                        {member.institution && <p>{member.institution}</p>}
                        {member.year && <p>{member.year}</p>}
                      </div>
                    )}
                  </div>

                  {member.bio && (
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {member.bio}
                    </p>
                  )}

                  {(member.email || member.homepage) && (
                    <div className="mt-6 flex flex-wrap gap-3 pt-2 text-sm font-semibold text-[#C0165F]">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 transition-colors hover:text-[#a00d4a]"
                          aria-label={`Email ${member.name}`}
                        >
                          <MailIcon />
                          <span>Email</span>
                        </a>
                      )}
                      {member.homepage && (
                        <a
                          href={member.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 transition-colors hover:text-[#a00d4a]"
                          aria-label={`${member.name}'s homepage`}
                        >
                          <GlobeIcon />
                          <span>Homepage</span>
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
