# Smart Student Presentation Website

This is a zero-dependency presentation website for the Smart Student Burnout & Productivity Ecosystem.

## Files to edit

- `site-content.js`: update names, notes, timeline text, and gallery items
- `styles.css`: adjust colors, spacing, and overall look
- `index.html`: change the structure only if you want new sections

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Railway

This repo now supports both Railway deployment styles:

### Option 1: Node service

- Build command: leave empty
- Start command: `npm start`

Use this when Railway detects the project as a normal Node app.

### Option 2: Static site

- Build command: `npm run build`
- Publish directory: `build`

Use this when Railway is asking for a publish directory. The build script copies the site files and `media/` into `build/`.
