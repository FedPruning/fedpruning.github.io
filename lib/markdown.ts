/**
 * Parses frontmatter and content from markdown text
 */
function parseFrontMatter(markdown: string): { frontMatter: any; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = markdown.match(frontMatterRegex)
  
  if (!match) {
    return { frontMatter: {}, content: markdown }
  }
  
  const frontMatterText = match[1]
  const content = match[2]
  
  // Parse YAML-like frontmatter
  const frontMatter: any = {}
  const lines = frontMatterText.split('\n')
  
  let currentKey = ''
  let currentArray: any[] = []
  let isInArray = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    if (trimmed.startsWith('- ')) {
      // Array item
      if (trimmed.includes('text:')) {
        const textMatch = trimmed.match(/text:\s*(.+)/)
        if (textMatch) {
          currentArray.push({ text: textMatch[1] })
        }
      } else if (trimmed.includes('link:')) {
        const linkMatch = trimmed.match(/link:\s*(.+)/)
        if (linkMatch && currentArray.length > 0) {
          currentArray[currentArray.length - 1].link = linkMatch[1]
        }
      } else {
        currentArray.push(trimmed.substring(2))
      }
      isInArray = true
    } else if (trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':')
      const key = trimmed.substring(0, colonIndex).trim()
      const value = trimmed.substring(colonIndex + 1).trim()
      
      if (isInArray && currentKey) {
        frontMatter[currentKey] = currentArray
        currentArray = []
        isInArray = false
      }
      
      currentKey = key
      
      if (value) {
        frontMatter[key] = value
      } else {
        currentArray = []
        isInArray = true
      }
    }
  }
  
  if (isInArray && currentKey) {
    frontMatter[currentKey] = currentArray
  }
  
  return { frontMatter, content }
}

/**
 * Retrieves and parses markdown content by its slug from public/content directory
 * @param slug - The content identifier (e.g., 'home', 'publications')
 * @returns Object containing front matter data and markdown content
 */
export async function getContentBySlug(slug: string): Promise<{
  frontMatter: any
  content: string
}> {
  try {
    const response = await fetch(`/content/${slug}.md`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`)
    }
    
    const markdown = await response.text()
    return parseFrontMatter(markdown)
  } catch (error) {
    console.error(`Error reading content for slug "${slug}":`, error)
    return {
      frontMatter: {},
      content: `# Error\n\nCould not load content for "${slug}".`,
    }
  }
}
