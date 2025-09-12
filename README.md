# Resource Library for Community Data

This is a Digital Garden built with Eleventy (11ty) that serves as a resource library for community data governance. The site processes markdown content from Obsidian with advanced features like internal linking, callouts, search functionality, and theme customization.

Based on the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden) template.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/oleeskild/digitalgarden)

---

## Content Guidelines

### Image Width Controls

You can control the width of images in your markdown content using the pipe syntax:

**Available width options:**

- `![image.png|full]` - Full width (100% of container, may stretch)
- `![image.png|half]` - Medium width (75% of container, min 300px)
- `![image.png|small]` - Small width (25% of container)
- `![image.png|500]` - Specific pixel width (e.g., 500px)
- `![image.png]` - Default width (preserves aspect ratio, max 100% of container)

**Examples:**

```markdown
![case study map.png|full](/img/map.png)
![profile photo.jpg|small](/img/photo.jpg) 
![diagram.png|300](/img/diagram.png)
```

**Responsive behavior:**

- On mobile devices (screens under 768px), full and half-width images automatically become full-width
- Small images become 50% width on mobile for better readability

### Heading Line Breaks

For long headings that need to wrap to multiple lines, you can use HTML line breaks directly in markdown:

```markdown
### Long Heading Title,<br>Subtitle or Additional Information
```

This creates a manual line break within the heading element without creating separate heading elements.

---

## Docs

Docs are available at [dg-docs.ole.dev](https://dg-docs.ole.dev/)
