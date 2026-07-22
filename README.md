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
4. Add the contact form environment variables listed below.
5. Deploy.

## Main Files

- `app/page.tsx`: site content, sections, contact form behavior, and technical diagram.
- `app/globals.css`: visual design, responsive layout, and form states.
- `app/layout.tsx`: metadata, Open Graph card, and favicon wiring.
- `public/og.png`: generated social preview image for link sharing.

## Contact Form

The contact form posts to `app/api/contact/route.ts` and sends submissions to
`calderr@mit.edu` through Resend.

Create a Resend account, verify a sending domain or sender address, then set
these variables in Vercel:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=calderr@mit.edu
CONTACT_FROM_EMAIL=VoidCool <your_verified_sender@yourdomain.com>
```

For local testing, copy `.env.example` to `.env.local` and fill in the same
values. Real `.env*` files are ignored by git so secrets do not get committed.
