/**
 * Content parsing utilities for extracting structured data from markdown
 */

export interface Publication {
  id: string
  citation: string
  links: { text: string; url: string }[]
  abstract?: string
}

export interface Member {
  name: string
  position?: string
  institution?: string
  email?: string
  image?: string
  interests?: string[]
  homepage?: string
  year?: string
  focus?: string
  thesis?: string
  current?: string
  highlights?: string[]
  bio?: string
}

export interface MemberGroup {
  title: string
  members: Member[]
}

export interface Feature {
  title: string
  description: string
}

/**
 * Parses markdown content to extract publication information
 * @param content - Raw markdown content
 * @returns Publications grouped by year
 */
export function parsePublications(content: string): { [section: string]: Publication[] } {
  const publicationsBySection: { [section: string]: Publication[] } = {}

  const sectionChunks = content.split(/^##\s+(.+)$/gm)

  for (let i = 1; i < sectionChunks.length; i += 2) {
    const sectionTitle = sectionChunks[i]?.trim()
    const sectionContent = sectionChunks[i + 1]?.trim()

    if (!sectionTitle || !sectionContent) continue

    const entryBlocks = sectionContent
      .split(/\n{2,}(?=\d+\.\s)/)
      .map(block => block.trim())
      .filter(Boolean)

    const publications: Publication[] = []

    for (const block of entryBlocks) {
      const numberMatch = block.match(/^(\d+)\.\s+/)
      if (!numberMatch) continue

      const id = numberMatch[1]

      const citationLines: string[] = []
      const lines = block.split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (trimmed.startsWith('**Links**') || trimmed.startsWith('**Abstract**')) {
          break
        }
        citationLines.push(trimmed)
      }

      const citation = citationLines
        .join(' ')
        .replace(/^\d+\.\s*/, '')
        .replace(/\s+/g, ' ')
        .trim()

      if (!citation) continue

      const links: { text: string; url: string }[] = []
      const linkRegex = /\[\[([^\]]+)\]\]\(([^)]+)\)/g
      let linkMatch: RegExpExecArray | null
      while ((linkMatch = linkRegex.exec(block)) !== null) {
        links.push({ text: linkMatch[1], url: linkMatch[2] })
      }

      const abstractMatch = block.match(/\*\*Abstract\*\*:\s*([\s\S]+?)(?=\n{2,}(?:\d+\.\s)|\n##|$)/)
      const abstract = abstractMatch ? abstractMatch[1].trim() : undefined

      publications.push({
        id,
        citation,
        links,
        abstract,
      })
    }

    if (publications.length > 0) {
      publicationsBySection[sectionTitle] = publications
    }
  }

  return publicationsBySection
}

/**
 * Parses markdown content to extract member information grouped by categories
 * @param content - Raw markdown content
 * @returns Array of member groups
 */
export function parseMemberGroups(content: string): MemberGroup[] {
  const groups: MemberGroup[] = []
  
  // Split by group headings (## Group Name)
  const groupSections = content.split(/^## (.+)$/gm)
  
  for (let i = 1; i < groupSections.length; i += 2) {
    const groupTitle = groupSections[i]
    const groupContent = groupSections[i + 1]
    
    // Split by member separators (---) or ### headings
    const memberBlocks = groupContent.split(/^---$/gm)
    
    const members: Member[] = []
    
    for (const block of memberBlocks) {
      const trimmedBlock = block.trim()
      if (!trimmedBlock) continue
      
      // Extract name (### heading)
      const nameMatch = trimmedBlock.match(/^### (.+)$/m)
      if (!nameMatch) continue
      
      const name = nameMatch[1]
      
      // Extract other fields
      const positionMatch = trimmedBlock.match(/\*\*Position\*\*:\s*(.+)$/m)
      const institutionMatch = trimmedBlock.match(/\*\*Institution\*\*:\s*(.+)$/m)
      const emailMatch = trimmedBlock.match(/\*\*Email\*\*:\s*(.+)$/m)
      const imageMatch = trimmedBlock.match(/\*\*Image\*\*:\s*(.+)$/m)
      const homepageMatch = trimmedBlock.match(/\*\*Homepage\*\*:\s*(.+)$/m)
      const yearMatch = trimmedBlock.match(/\*\*Year\*\*:\s*(.+)$/m)
      const focusMatch = trimmedBlock.match(/\*\*Focus\*\*:\s*(.+)$/m)
      const thesisMatch = trimmedBlock.match(/\*\*Thesis\*\*:\s*(.+)$/m)
  const currentMatch = trimmedBlock.match(/\*\*Current Position\*\*:\s*(.+)$/m)
  const bioMatch = trimmedBlock.match(/\*\*Bio\*\*:\s*([\s\S]+?)(?=\n{2,}|\n\*\*|$)/)
      
      // Extract research interests (list items after **Research Interests:**)
  const interestsSection = trimmedBlock.match(/\*\*Research Interests\*\*:\s*([\s\S]+?)(?=\n\n|\n\*\*|$)/)
      let interests: string[] | undefined
      if (interestsSection) {
        interests = interestsSection[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().substring(1).trim())
      }

  const highlightsSection = trimmedBlock.match(/\*\*(?:Highlights|Bio|Background)\*\*:\s*([\s\S]+?)(?=\n\n|\n\*\*|$)/)
      let highlights: string[] | undefined
      if (highlightsSection) {
        highlights = highlightsSection[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().substring(1).trim())
      }
      
      members.push({
        name,
        position: positionMatch ? positionMatch[1] : undefined,
        institution: institutionMatch ? institutionMatch[1] : undefined,
        email: emailMatch ? emailMatch[1] : undefined,
        image: imageMatch ? imageMatch[1] : undefined,
        homepage: homepageMatch ? homepageMatch[1] : undefined,
        interests,
        year: yearMatch ? yearMatch[1] : undefined,
        focus: focusMatch ? focusMatch[1] : undefined,
        thesis: thesisMatch ? thesisMatch[1] : undefined,
        current: currentMatch ? currentMatch[1] : undefined,
        highlights,
        bio: bioMatch ? bioMatch[1].replace(/\s+/g, ' ').trim() : undefined,
      })
    }
    
    if (members.length > 0) {
      groups.push({
        title: groupTitle,
        members,
      })
    }
  }
  
  return groups
}

/**
 * Parses HTML content to extract feature cards from h3 headings
 * @param htmlContent - Processed HTML content
 * @returns Array of features
 */
export function parseFeatures(htmlContent: string): Feature[] {
  const features: Feature[] = []
  
  // Match h3 headings and their following paragraphs
  const h3Regex = /<h3>([^<]+)<\/h3>\s*(?:<p>([^<]+)<\/p>)?/g
  let match
  
  while ((match = h3Regex.exec(htmlContent)) !== null) {
    features.push({
      title: match[1],
      description: match[2] || '',
    })
  }
  
  return features
}
