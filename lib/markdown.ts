import matter from 'gray-matter'

/**
 * Parses front matter and markdown body using gray-matter for full YAML support
 */
function parseFrontMatter(markdown: string): { frontMatter: any; content: string } {
  const { data, content } = matter(markdown)
  return { frontMatter: data ?? {}, content }
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
