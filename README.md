# Passkey Pilot

An interactive educational website that demonstrates how passkeys work and compares them to traditional authentication methods. Built for everyday users to understand and adopt passkey authentication.

## 🚀 Live Demo

[https://pbuffolino.github.io/hackathon-passkey-site/](https://pbuffolino.github.io/hackathon-passkey-site/)

## Overview

Passkey Pilot educates users about passkeys—a modern, phishing-resistant authentication method that replaces passwords with cryptographic keys unlocked by biometrics or device PINs. 

### Key Features

- **Interactive Demo**: Hands-on passkey registration and authentication using the WebAuthn API
- **MFA Comparison**: Visual leaderboard comparing passkeys to other authentication methods
- **FAQ Section**: Common questions answered in beginner-friendly language

## Features

### Beginner-Friendly Design
- Conversational language with minimal technical jargon
- Progressive disclosure—basics first, technical details on demand
- Real-world analogies to explain complex concepts
- Mobile-first responsive design

### Interactive Passkey Demo
- Real WebAuthn API integration for passkey creation and authentication
- Step-by-step visual walkthrough of registration and login flows
- Toggle between simple and technical explanations
- Comprehensive metadata display including:
  - Credential ID, attestation format, hardware type, cryptographic algorithm
  - User verification status, sign count, AAGUID, backup flags
  - RP ID hash, origin, and signature details
- "What Just Happened?" panels explaining each step
- Graceful error handling for unsupported browsers

### Educational Content
- "Passkeys, in 30 seconds" quick-start guide
- FAQ with 10 common questions
- MFA comparison leaderboard (8 authentication methods)
- Links to authoritative sources (passkeys.dev, FIDO Alliance)

### Design System
- Dark theme with electric blue accent (`#00D9FF`)
- Tailwind CSS v4 for styling
- Smooth animations and transitions
- Accessible UI components

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router) with React 19.2.1
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **WebAuthn**: Native browser API for passkey operations
- **CBOR Decoding**: `cbor-x` library for credential data parsing
- **Deployment**: GitHub Pages via `gh-pages` package

## Project Structure

```
passkey-pilot/
├── src/
│   └── app/
│       ├── components/
│       │   ├── PasskeyWalkthrough.tsx    # Interactive passkey demo
│       │   ├── MFALeaderboard.tsx        # MFA comparison table
│       │   └── FAQ.tsx                    # FAQ accordion
│       ├── page.tsx                      # Main landing page
│       ├── layout.tsx                    # Root layout and metadata
│       └── globals.css                   # Global styles
├── public/                               # Static assets
├── out/                                  # Build output (static export)
├── next.config.ts                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
├── package.json                          # Dependencies and scripts
├── DEPLOYMENT_RUNBOOK.md                 # Deployment guide
└── README.md                             # This file
```

### Key Components

**`PasskeyWalkthrough.tsx`**
- Core interactive component demonstrating passkey lifecycle
- Registration flow: 5-step process from initiation to success
- Authentication flow: Passkey validation during login
- Dual view modes: Simple explanations and technical details
- Uses `navigator.credentials.create()` and `navigator.credentials.get()`
- Parses CBOR-encoded attestation objects

**`MFALeaderboard.tsx`**
- Vendor-agnostic comparison of 8 authentication methods
- Color-coded icons (green/red/yellow) for security properties
- Tooltips explaining phishing resistance and device binding
- Rankings from "Very Weak" to "Maximum" security

**`FAQ.tsx`**
- 10 common questions in expandable accordion format
- Covers device requirements, security, multi-device usage, compatibility
- Written for non-technical users with practical examples

**`page.tsx`**
- Hero section with CTAs ("Try the Live Demo", "Compare Security")
- "Passkeys in 30 seconds" educational overview
- Smooth scroll navigation to demo and leaderboard sections

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

> **Note**: The `basePath` configuration only applies to production builds. In development, the site runs at the root path.

### Build

```bash
npm run build
```

Creates a static export in the `out/` directory.

### Lint

```bash
npm run lint
```

## Deployment

This project deploys to GitHub Pages as a static site. See [DEPLOYMENT_RUNBOOK.md](DEPLOYMENT_RUNBOOK.md) for detailed instructions.

### Quick Deploy

```bash
npm run deploy
```

This command:
1. Builds a static export (`next build`)
2. Pushes the `out/` directory to the `gh-pages` branch

### GitHub Pages Setup
- **Settings → Pages**
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` / `/ (root)`

### Configuration Notes
- Static export enabled via `output: 'export'` in `next.config.ts`
- Base path: `/hackathon-passkey-site` for subdirectory hosting
- `.nojekyll` file prevents GitHub from ignoring `_next` folder
- HTTPS required for WebAuthn API (GitHub Pages provides HTTPS by default)

## Browser Compatibility

- Requires modern browser with WebAuthn support (Chrome, Safari, Firefox, Edge)
- Best experience with platform authenticators (Touch ID, Face ID, Windows Hello)
- Graceful error messages for unsupported browsers

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn-2/)
- [Passkeys.dev](https://passkeys.dev) - W3C WebAuthn Community Adoption Group
- [FIDO Alliance](https://fidoalliance.org/passkeys/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Credits

Built by [Pat Buffolino](https://www.linkedin.com/in/pasqualebuffolino/) with [Cursor](https://cursor.sh/).

Resources from:
- W3C WebAuthn Specification
- FIDO Alliance
- Passkeys.dev (W3C WebAuthn Community Adoption Group)

## License

MIT License - see [LICENSE](LICENSE) file for details.

This project is open source and free to use, modify, and distribute with attribution.
