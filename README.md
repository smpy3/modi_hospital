Modi Hospital website (Next.js + Tailwind + smooth scroll animations + contact form email).

## Getting Started

### 1) Install deps

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Contact form -> email notifications

This site is deployable to GitHub Pages (static hosting), so the contact form is set up to send via Formspree.

### Setup

1. Create a Formspree form and copy your endpoint URL.
2. Copy `web/.env.example` -> `web/.env.local`
3. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to your Formspree endpoint.
4. Restart `npm run dev`.

If the endpoint isn’t set, the form will open a mail draft as a fallback (using `NEXT_PUBLIC_CONTACT_EMAIL`).

## Editing content

Main page sections live in:

- `src/app/page.tsx`
- `src/components/*`

## Deploy to GitHub Pages (no manual variables)

1. Push this repo to GitHub (default branch `main`).
2. GitHub repo -> Settings -> Pages -> Source: GitHub Actions.
3. Push any commit to `main` and GitHub Actions will publish automatically.

Notes:
- The workflow auto-detects the correct Pages URL and sets `basePath` for you.
- If you want the contact form to email you, set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` later (optional).
