# FedPruning Website Content Guide

This project is a markdown-driven academic website. All copy lives in markdown files and is rendered automatically by the Next.js components in the `app/` directory. If you can edit text files, you can update the site.

## Where To Edit

Editable content sits under `public/content/`. Each file maps to a route and a renderer component:

| Markdown file | Page URL | React renderer |
| ------------- | -------- | -------------- |
| `public/content/home.md` | `/` | `app/home/components/HomeRenderer.tsx`
| `public/content/members.md` | `/members` | `app/members/components/MemberGrid.tsx`
| `public/content/publications.md` | `/publications` | `app/publications/components/PublicationList.tsx`
| `public/content/join.md` | `/join` | `app/join/components/JoinRenderer.tsx`

Update the markdown, save, then refresh the page in the browser to see the new content.

## Editing Workflow

- Open the markdown file for the page you want to change.
- Keep the YAML front matter at the top (between `---`) intact; it feeds page titles and descriptions.
- Follow the format rules in the sections below so the parser can read your changes.
- Store any new images in `public/image/` and reference them with a leading slash (for example `/image/alice-wang.jpg`).

## Page Formats

**Homepage (`public/content/home.md`)**
- Front matter fields (`title`, `subtitle`, `description`, optional `cta` buttons) populate the hero banner.
- `##` headings create full-width sections.
 - The homepage now renders the markdown content directly (using the `HomeRenderer` component).
 - The renderer processes the markdown starting from the intro paragraph and outputs HTML as-written.

**Members (`public/content/members.md`)**
- `##` headings create member groups (Principal Investigators, PhD Students, etc.).
- Within each group, start members with `### Name` and separate profiles using `---` on its own line.
- Supported fields use bold labels: `**Position**`, `**Institution**`, `**Email**`, `**Homepage**`, `**Image**`, and `**Bio**`. The site reads these labels exactly as written.
- `**Image**` must point to a file in `public/image/`; use square jpg/png images for best results.
- The `**Bio**` paragraph becomes the visible description under the name. Email and homepage links automatically render with icons.

**Publications (`public/content/publications.md`)**
- Papers use normal Markdown under sections like `## Preprints` and `## Published`.
- Each item includes the citation plus bold labels (`**Links**`, `**Abstract**`).
- Buttons use the `[[Text]](URL)` syntax.
- Content is rendered exactly as written.

**Join Page (`public/content/join.md`)**
- Front matter sets the page title and description.
- The Markdown body is displayed exactly as written.

## Image and Asset Tips

- Place member headshots in `public/image/` with lowercase, hyphenated filenames (for example `jackson-lee.jpg`).
- Refer to images in markdown with a leading slash: `/image/jackson-lee.jpg`.
- Reuse the existing placeholder image if you do not have a photo: `/placeholder-user.jpg`.

## Previewing Changes

Run `pnpm install` once, then `pnpm dev` to start the local preview. Editing markdown files triggers an automatic reload, so you can confirm the layout after each change.

## Need Help?

- Compare your changes with the existing examples in `public/content/` if you are unsure about formatting.
- If something does not render, check for missing `---` separators, typos in field labels, or image paths that do not exist.
