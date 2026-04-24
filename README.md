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

## Deploy to GitHub Pages

1. Push the contents of this `web/` folder to GitHub (default branch should be `main`).
2. In your GitHub repo: Settings -> Pages -> Source: GitHub Actions.
3. Ensure the workflow exists at `.github/workflows/deploy-pages.yml`.
4. Add repo Variables (Settings -> Secrets and variables -> Actions -> Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-username>.github.io/<repo-name>`
   - `NEXT_PUBLIC_BASE_PATH` = `/<repo-name>`
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` = your Formspree endpoint
   - `NEXT_PUBLIC_CONTACT_EMAIL` = optional (mailto fallback)
5. Push to `main` and GitHub Actions will publish.
