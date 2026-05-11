# FinSight Website

FinSight is a website for an voice-first mobile banking concept built for blind and low-vision users. The site presents the accessibility problem, research insights, design guidelines, a prototype video, team information, and a separate voice-guided reading mode.

## Project Structure

```text
.
├── index.html        # Main website
├── voice.html        # Voice-guided mode
├── content.js        # Shared site copy, data, frames, team info, and voice transcript
├── script.js         # Main site interactions and animations
├── voice.js          # Voice-guided mode player and transcript behavior
├── styles.css        # Main website styles
├── voice.css         # Voice-guided mode styles
├── CNAME             # GitHub Pages custom domain
└── assets/           # Images, videos, logos, team photos, and app frames
```

## Run Locally

This project does not require a build step or package install.

From the project folder, start a local static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The voice-guided version is available at:

```text
http://localhost:8000/voice.html
```

## Editing Content

Most page copy and structured content lives in `content.js`, including:

- Hero copy and cycling words
- Research stats and quote data
- Design guideline cards
- Animated FinSight app preview frames
- Team member data
- Voice guide transcript sections

Update `index.html` only when changing page structure or embeds. Update `styles.css` for main site visual changes, and `voice.css` for voice-guided mode styling.

## Prototype Video

The prototype section embeds a Google Drive video in `index.html`.

Use the Google Drive preview URL format:

```html
https://drive.google.com/file/d/FILE_ID/preview
```

Do not use the regular share URL with `/view?usp=sharing` inside the iframe, because it can show a Google 403 error when embedded.

## Deployment

The repository is set up for static hosting, including GitHub Pages-style deployment with the custom domain listed in `CNAME`.

Before publishing, check that:

- The prototype video is shared as "Anyone with the link can view"
- The iframe URL uses `/preview`
- Main pages load correctly at `index.html` and `voice.html`
- Large assets in `assets/` are intentionally included

