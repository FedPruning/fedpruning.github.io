# FedPruning Website

A markdown-driven academic website for the FedPruning project, built with Next.js 14 and Tailwind CSS.

## Overview

This website is designed to be **content-first** and **user-friendly**. All content is managed through English markdown files in the `content/` directory. Simply edit these files to update the website - no coding required!

## Quick Start

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This generates static files in the `out/` directory ready for deployment.

## Content Management

### File Structure

All editable content is located in the `content/` directory:

\`\`\`
content/
├── home.md           # Homepage content
├── publications.md   # Publications list
├── members.md        # Team members
└── join.md          # Join us page
\`\`\`

### Markdown Syntax Reference

All content files use standard Markdown syntax with YAML front matter:

\`\`\`markdown
---
title: "Page Title"
description: "Page description"
---

## Section Heading

Your content here...
\`\`\`

## Content Editing Guides

### 1. Homepage (content/home.md)

The homepage uses front matter for the hero section:

\`\`\`markdown
---
title: "FedPruning"
subtitle: "Your subtitle here"
description: "Brief description"
cta:
  - text: "Button Text"
    link: "https://your-link.com"
  - text: "Second Button"
    link: "https://another-link.com"
---

## About FedPruning

Your about section content...

## Key Features

### Feature Name
Feature description here.

### Another Feature
Another feature description.
\`\`\`

**Key points:**
- `cta` array creates call-to-action buttons
- `### Feature Name` creates feature cards automatically
- The first paragraph under each `###` becomes the feature description

### 2. Publications (content/publications.md)

Publications are organized by year with a specific format:

\`\`\`markdown
---
title: "Publications"
description: "Research papers"
---

## 2024

### Paper Title Here
**Authors**: John Doe, Jane Smith  
**Venue**: *Conference Name (CONF 2024)*  
**Links**: [[PDF]](/papers/paper.pdf) [[Code]](https://github.com/...)  
**Award**: 🏆 Outstanding Paper Award

**Abstract**: Your abstract here...

---

### Another Paper Title
**Authors**: Alice Wang  
**Venue**: *Journal Name*  
**Links**: [[arXiv]](https://arxiv.org/...)

---

## 2023

### Paper from 2023
...
\`\`\`

**Key points:**
- Use `## YYYY` for year headings
- Use `### Title` for paper titles
- Use `---` to separate papers
- Use `[[Text]](URL)` format for links
- `**Award**:` line is optional
- `**Abstract**:` creates a collapsible abstract section

### 3. Members (content/members.md)

Members are organized by groups (PI, PhD Students, etc.):

\`\`\`markdown
---
title: "Team Members"
description: "Meet our team"
---

## Principal Investigators

### Prof. John Doe
**Position**: Associate Professor  
**Institution**: University Name  
**Email**: john@example.com  
**Homepage**: https://johndoe.com  
**Image**: /images/members/john.jpg

**Research Interests**:
- Interest 1
- Interest 2
- Interest 3

---

### Dr. Jane Smith
**Position**: Research Scientist  
**Institution**: Company Name  
**Email**: jane@example.com  
**Image**: /images/members/jane.jpg

---

## PhD Students

### Alice Wang
**Institution**: University Name  
**Year**: 3rd Year PhD  
**Focus**: Research focus area  
**Email**: alice@example.edu  
**Image**: /images/members/alice.jpg

---

## Alumni

### Bob Chen (PhD, 2023)
**Thesis**: "Thesis Title"  
**Current Position**: Position at Company

---
\`\`\`

**Key points:**
- Use `## Group Name` for member categories
- Use `### Member Name` for individual members
- Use `---` to separate members
- All fields except `name` are optional
- Research interests become colored tags
- Alumni can include thesis and current position

### 4. Join Us (content/join.md)

The join page uses standard markdown:

\`\`\`markdown
---
title: "Join Our Research Team"
description: "We're hiring!"
---

## Why Join Us?

- 🎓 Benefit 1
- 🌍 Benefit 2
- 💻 Benefit 3

## Open Positions

### PhD Positions (2 openings)

**Requirements**:
- Requirement 1
- Requirement 2

**Topics**:
- Topic 1
- Topic 2

---

### Research Internships

**Duration**: 3-6 months  
**Topics**:
- Topic 1
- Topic 2

---

## Contact

Email: contact@example.com
\`\`\`

**Key points:**
- Use emojis for visual appeal
- Use `### Position Name` for job postings
- Use `**Field**:` format for structured information
- Use `---` to separate positions

## Adding Images

### Member Photos

1. Save images to `public/images/members/`
2. Use lowercase filenames: `john-doe.jpg`
3. Reference in markdown: `/images/members/john-doe.jpg`
4. Recommended size: 400x400px, square format

### Papers and Documents

1. Save PDFs to `public/papers/`
2. Reference in markdown: `/papers/your-paper.pdf`

### Logo

Replace `public/logo.svg` with your logo (maintain same filename).

## Styling Customization

### Brand Colors

Edit `tailwind.config.js`:

\`\`\`javascript
colors: {
  primary: {
    DEFAULT: '#C0165F',  // Main brand color
    dark: '#9A1150',     // Darker shade
    light: '#FFE5F0',    // Lighter shade
  },
}
\`\`\`

## Deployment

### GitHub Pages

1. Update `next.config.js` with your repository name:

\`\`\`javascript
const nextConfig = {
  basePath: '/your-repo-name',  // Add if not using user page
  // ...
}
\`\`\`

2. Build and export:

\`\`\`bash
npm run build
\`\`\`

3. Deploy the `out/` directory to GitHub Pages

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The `out/` directory contains static files that can be deployed anywhere:
- Netlify
- Cloudflare Pages
- AWS S3
- Any static hosting service

## Troubleshooting

### Images not showing

- Check the file path is correct (case-sensitive)
- Ensure images are in `public/` directory
- Use forward slashes `/` not backslashes `\`

### Content not updating

- Clear Next.js cache: Delete `.next/` directory
- Rebuild: `npm run build`
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Markdown not rendering correctly

- Check for proper spacing (blank lines between sections)
- Ensure front matter is properly formatted with `---`
- Verify bold text uses `**text**` not `__text__`

### Build errors

- Run `npm install` to ensure dependencies are installed
- Check markdown syntax in all content files
- Look for missing images referenced in markdown

## Advanced Customization

### Adding New Pages

1. Create markdown file: `content/newpage.md`
2. Create page component: `app/newpage/page.tsx`
3. Add navigation link in `components/layout/Navigation.tsx`

### Modifying Components

All UI components are in `components/` directory:
- `components/layout/` - Navigation and footer
- `components/markdown/` - Content renderers

### Typography

Font can be changed in `app/layout.tsx`:

\`\`\`typescript
import { Inter } from 'next/font/google'  // Change font here
\`\`\`

## Support

For issues or questions:
- Check this README first
- Review the example content files
- Open an issue on GitHub
- Contact: contact@fedpruning.org

## License

MIT License - feel free to use and modify for your project.
