/**
 * Content parsing utilities for extracting structured data from markdown
 */

export interface Publication {
  title: string
  authors: string
  venue: string
  links: { text: string; url: string }[]
  abstract?: string
  award?: string
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
export function parsePublications(content: string): { [year: string]: Publication[] } {
  const publicationsByYear: { [year: string]: Publication[] } = {}
  
  // Split by year headings (## YYYY)
  const yearSections = content.split(/^## (\d{4})$/gm)
  
  for (let i = 1; i < yearSections.length; i += 2) {
    const year = yearSections[i]
    const yearContent = yearSections[i + 1]
    
    // Split by horizontal rules or ### headings
    const papers = yearContent.split(/^---$/gm)
    
    const publications: Publication[] = []
    
    for (const paper of papers) {
      const trimmedPaper = paper.trim()
      if (!trimmedPaper) continue
      
      // Extract title (### heading)
      const titleMatch = trimmedPaper.match(/^### (.+)$/m)
      if (!titleMatch) continue
      
      const title = titleMatch[1]
      
      // Extract authors
      const authorsMatch = trimmedPaper.match(/\*\*Authors\*\*:\s*(.+)$/m)
      const authors = authorsMatch ? authorsMatch[1] : ''
      
      // Extract venue
      const venueMatch = trimmedPaper.match(/\*\*Venue\*\*:\s*(.+)$/m)
      const venue = venueMatch ? venueMatch[1].replace(/\*/g, '') : ''
      
      // Extract links [[text]](url)
      const linksMatches = trimmedPaper.matchAll(/\[\[([^\]]+)\]\]$$([^)]+)$$/g)
      const links: { text: string; url: string }[] = []
      for (const match of linksMatches) {
        links.push({ text: match[1], url: match[2] })
      }
      
      // Extract award
      const awardMatch = trimmedPaper.match(/\*\*Award\*\*:\s*(.+)$/m)
      const award = awardMatch ? awardMatch[1] : undefined
      
      // Extract abstract
      const abstractMatch = trimmedPaper.match(/\*\*Abstract\*\*:\s*(.+?)(?=\n\n|\n\*\*|$)/s)
      const abstract = abstractMatch ? abstractMatch[1].trim() : undefined
      
      publications.push({
        title,
        authors,
        venue,
        links,
        abstract,
        award,
      })
    }
    
    if (publications.length > 0) {
      publicationsByYear[year] = publications
    }
  }
  
  return publicationsByYear
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
      
      // Extract research interests (list items after **Research Interests:**)
      const interestsSection = trimmedBlock.match(/\*\*Research Interests\*\*:(.+?)(?=\n\n|\n\*\*|$)/s)
      let interests: string[] | undefined
      if (interestsSection) {
        interests = interestsSection[1]
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
