# Changelog

All notable changes to the Vallesi Capital site.

## 2026-04-28

### Shipped
- **Live on production** at https://vallesicapital.com (Vercel)
- Custom domain configured with apex + www redirect
- DNS migrated from Squarespace to Vercel (A record at apex, CNAME for www)

### Site
- Initial single-page marketing site built with React, TypeScript, Vite, Tailwind v4
- Four sections: hero, investment philosophy (4-card grid), about, CTA, footer
- Contact modal with full form (first name, last name, email, message)
- Framer Motion animations on scroll and load
- Light theme with warm cream/brown palette (`#f5f1ea` background, `#8b6f47` accent)

### Typography
- Switched from Fraunces (not properly loaded, falling back to Times) to Instrument Serif
- Loaded Inter and Instrument Serif via Google Fonts CDN
- Reduced hero headline size from 104px to 84px on desktop for better balance

### Copy
- Updated CTA headline from "Let's build something that lasts." to "Built to endure."
- Unified "We invest with conviction..." line to use the same display style as hero

### Mobile responsiveness
- Nav: hidden Approach/About text links on small screens, kept wordmark + Contact button
- Hero image aspect ratio adapts: 4:3 on mobile, 16:10 on tablet, 21:9 on desktop
- Section padding reduced from 128px to 80px on mobile
- Drop cap in About section scaled from 104px to 72px on mobile
- All text sizes scale down appropriately on small screens

### Contact form
- Wired to Resend via Vercel serverless function at `/api/contact`
- Honeypot field for basic bot protection
- Reply-To set to visitor's email (replies go directly to them)
- Validates required fields and email format
- Status: code is live, awaiting Resend API key + env vars in Vercel to activate

### Infrastructure
- GitHub repo: https://github.com/tanzims/vallesi-capital (public)
- Hosted on Vercel (separate account from other projects)
- Domain registered with Squarespace (kept), DNS managed via Squarespace
- Google Workspace email kept intact (MX records preserved)
- Squarespace website subscription: kept until Jan 2027 renewal as fallback

### Pending
- Add `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` env vars in Vercel to activate contact form
- Verify domain in Resend (3 DNS records to add in Squarespace)
- Decide sender address (contact@ vs hello@ vs info@vallesicapital.com)
- Decide destination inbox for contact form submissions
