# VoidCool Website

Clean startup landing page for VoidCool, a company developing modular,
mass-manufacturable liquid droplet radiators for high-power space
infrastructure.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The project uses standard Next.js scripts, so it is ready for a normal
GitHub-to-Vercel workflow.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project** and import the GitHub repo.
3. Keep Vercel's default Next.js settings:
   - Framework preset: `Next.js`
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave blank
4. Deploy.

## Main Files

- `app/page.tsx`: site content, sections, contact form behavior, and technical diagram.
- `app/globals.css`: visual design, responsive layout, and form states.
- `app/layout.tsx`: metadata, Open Graph card, and favicon wiring.
- `public/og.png`: generated social preview image for link sharing.

## Contact Form

The current form validates in the browser and shows a local success message.
To receive submissions, connect the form to a service such as Formspree,
Resend, HubSpot, or a custom Next.js API route.
