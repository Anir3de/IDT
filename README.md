# Ani & Pari Website

This is a zero-dependency romantic website rebuilt from the original standalone HTML file into a deployable structure.

## Files to edit

- `site-content.js`: update names, notes, timeline text, and gallery items
- `styles.css`: adjust colors, spacing, and overall look
- `index.html`: change the structure only if you want new sections

## Run locally

```bash
node server.js
```

Then open `http://localhost:3000`.

## Railway

Railway can deploy this directly because the repo includes:

- `package.json` with a `start` script
- `server.js` that respects `PORT`

After pushing the repo, Railway should detect it as a Node app and run `npm start`.
