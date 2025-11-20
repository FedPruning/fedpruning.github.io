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

      {/* Member Groups */}
      {memberGroups.map((group, groupIndex) => {
        // 如果该 group 没有成员数据，不渲染
        if (!group.members || group.members.length === 0) {
          return null
        }

        return (
          <div key={groupIndex} className="mb-16">
            {/* 只有当 group.title 存在时才显示标题 */}
            {group.title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {group.title}
              </h2>
            )}

            <div className="space-y-12">
              {group.members.map((member, memberIndex) => (
                <div key={memberIndex} className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={member.image || '/images/placeholder-user.jpg'}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    {/* Name and Title */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      {member.position && (
                        <p className="text-base font-medium text-gray-600 mt-1">
                          {member.position}
                        </p>
                      )}
                    </div>

                    {/* Institution and Year */}
                    {(member.institution || member.year) && (
                      <div className="mb-3 text-sm text-gray-600">
                        {member.institution && <p>{member.institution}</p>}
                        {member.year && <p>{member.year}</p>}
                      </div>
                    )}

                    {/* Bio */}
                    {member.bio && (
                      <p className="text-sm leading-relaxed text-gray-700 mb-4">
                        {member.bio}
                      </p>
                    )}

                    {/* Links */}
                    {(member.email || member.homepage) && (
                      <div className="flex flex-wrap gap-4 text-sm font-medium text-[#C0165F]">
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
        )
      })}
    </div>
  )
}