# The Passkey Pilot

An interactive educational website that demonstrates how passkeys work and compares them to traditional MFA methods, designed for everyday users to understand and adopt passkey authentication.

## 🚀 Live Demo

**Try it now:** [https://pbuffolino.github.io/hackathon-passkey-site/](https://pbuffolino.github.io/hackathon-passkey-site/)

## Purpose

The Passkey Pilot educates everyday users about passkeys—a modern, phishing-resistant authentication method that replaces passwords with biometric authentication (fingerprint, face recognition, or device PIN). The site provides:

- **Interactive Walkthrough**: A hands-on demonstration of the passkey registration and authentication process using the WebAuthn API
- **MFA Comparison**: A visual leaderboard comparing passkeys to other multi-factor authentication methods
- **FAQ Section**: Common questions answered in plain, beginner-friendly language

## Features

### Beginner-Friendly Design

- Simple, conversational language throughout
- Real-world analogies (e.g., "like a house key, but it's your fingerprint")
- Technical details are optional and hidden by default
- Progressive disclosure: show basics first, advanced info on demand
- No technical jargon in primary content

### Interactive Passkey Demo

- Real WebAuthn API integration for actual passkey creation and authentication
- Step-by-step visual walkthrough with beginner-friendly explanations
- Toggle between simple and technical explanations for both registration and validation
- Comprehensive technical metadata display aligned with WebAuthn specification:
  - **Registration**: Credential ID, attestation format, hardware type, algorithm, user verification, sign count, AAGUID, backup flags, RP ID hash, and origin
  - **Validation**: Credential match, sign count, user verification, origin verification, and signature details
- "What Just Happened?" panels for both enrollment and authentication flows
- Error handling for unsupported browsers or failed operations

### Educational Content

- "Passkeys 101" introductory section explaining concepts simply
- FAQ section with 10 common questions and links to authoritative sources
- MFA comparison table with simplified headers and tooltips
- "Still Have Questions" section with links to passkeys.dev and FIDO Alliance resources

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Dark theme with electric blue accent color (`#00D9FF`)
- Smooth animations and transitions
- Accessible UI components

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **WebAuthn API**: For actual passkey creation and authentication
- **CBOR Decoding**: `cbor-x` library for decoding WebAuthn credential data
- **React Compiler**: Enabled via Next.js config for optimized React rendering
- **Deployment**: `gh-pages` package for automated GitHub Pages deployment

## Project Structure

```text
passkey-pilot/
├── src/
│   └── app/
│       ├── components/
│       │   ├── PasskeyWalkthrough.tsx    # Interactive passkey demo component
│       │   ├── MFALeaderboard.tsx        # MFA methods comparison component
│       │   └── FAQ.tsx                    # Frequently asked questions component
│       ├── page.tsx                      # Main landing page
│       ├── layout.tsx                    # Root layout with metadata
│       └── globals.css                   # Global styles and Tailwind config
├── public/                               # Static assets
├── next.config.ts                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
├── package.json                          # Dependencies and scripts
└── DEPLOYMENT_RUNBOOK.md                 # Deployment and contribution guidelines
```

### Key Components

#### `page.tsx` (Main Landing Page)

- **Hero Section**: High-impact "One tap to sign in" messaging with "Try the Live Demo" and "Compare Security" CTAs
- **Passkeys in 30 Seconds**: Consolidated "What / Why / Where" section for quick understanding
- **Smooth Scrolling**: Implemented smooth scroll to anchor sections (`#demo`, `#leaderboard`)

#### `PasskeyWalkthrough.tsx`

The core interactive component that demonstrates the passkey lifecycle:

- **Registration Flow**: Shows the 5-step process of creating a passkey (initiation → biometric → key generation → public key registration → success)
- **Authentication Flow**: Demonstrates passkey validation during login
- **Technical Details**: Displays comprehensive credential metadata including credential ID, attestation format, hardware type, cryptographic algorithm, user verification status, sign count, AAGUID, backup flags, RP ID hash, and origin
- **Dual View Modes**: Toggle between simple explanations and technical details for both registration and validation flows
- Uses the WebAuthn API (`navigator.credentials.create()` and `navigator.credentials.get()`) for real passkey operations
- Parses CBOR-encoded attestation objects and authenticator data to extract WebAuthn specification properties

#### `MFALeaderboard.tsx`

A visual comparison of authentication methods:

- **Leaderboard UI**: Compares 8 common authentication methods in a vendor-agnostic format
- **Tooltips**: Hover-over explanations for icons (Phishing Resistance, Device Binding) to clarify security properties
- **Visuals**: Uses color-coded icons (Green/Red/Yellow) to indicate status clearly
- **Rankings**: Ranks methods by security strength (Very Weak → Maximum)

#### `FAQ.tsx`

A beginner-friendly FAQ component:

- 10 common questions about passkeys answered in plain language
- Covers topics like device requirements, security, multi-device usage, and compatibility
- Expandable accordion interface with clean visual separation
- Written for non-technical users with relatable examples
- Includes links to authoritative sources (passkeys.dev and FIDO Alliance)

## Getting Started

### Prerequisites

- Node.js 18+ (or compatible runtime)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

> **Note**: The basePath configuration (`/hackathon-passkey-site`) only applies to production builds. In development, the site runs at the root path.

The page will automatically reload when you make changes to the code.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

This generates a static export in the `out/` directory with the configured basePath.

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Deployment

This project is deployed to **GitHub Pages** as a static site. For detailed deployment instructions and contribution guidelines, see [DEPLOYMENT_RUNBOOK.md](DEPLOYMENT_RUNBOOK.md).

### Quick Deploy

Build and deploy with a single command:

```bash
npm run deploy
```

This command:
1. Runs `next build` to create a static export in the `out/` directory
2. Uses the `gh-pages` package to push the content to the `gh-pages` branch on GitHub

### GitHub Pages Configuration

In your repository settings:
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / `/ (root)`

### Deployment Notes

- **Static Export**: The site uses `output: 'export'` in `next.config.ts` for static HTML generation
- **Base Path**: Configured as `/hackathon-passkey-site` for GitHub Pages subdirectory hosting
- **Jekyll Bypass**: A `.nojekyll` file is included to prevent GitHub Pages from ignoring the `_next` folder
- **HTTPS Required**: WebAuthn API requires HTTPS in production environments (GitHub Pages provides HTTPS by default)

## Configuration

### Next.js Config (`next.config.ts`)

- React Compiler enabled for optimized rendering
- Static export mode for GitHub Pages deployment
- Base path configuration for subdirectory hosting

### TypeScript Config (`tsconfig.json`)

- Strict type checking enabled
- Path aliases configured (`@/*` maps to `./src/*`)
- ES2017 target with modern module resolution

### Tailwind CSS

- Configured via PostCSS (`postcss.config.mjs`)
- Custom color scheme with electric blue accent (`#00D9FF`)
- Global styles defined in `globals.css`

## Browser Compatibility

- Requires a modern browser with WebAuthn support (Chrome, Safari, Firefox, Edge)
- Works best with browsers that support platform authenticators (Touch ID, Face ID, Windows Hello, etc.)
- Graceful degradation with error messages for unsupported browsers

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WebAuthn API Specification](https://www.w3.org/TR/webauthn-2/)
- [Passkeys.dev](https://passkeys.dev) - Comprehensive passkey resources from W3C WebAuthn Community Adoption Group and FIDO Alliance
- [FIDO Alliance](https://fidoalliance.org/passkeys/) - Official FIDO Alliance passkey information
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Attribution

This project uses resources and information from:
- [WebAuthn API](https://www.w3.org/TR/webauthn-2/) - W3C Web Authentication specification
- [Passkeys.dev](https://passkeys.dev) - W3C WebAuthn Community Adoption Group and FIDO Alliance
- [FIDO Alliance](https://fidoalliance.org/) - FIDO Alliance standards and specifications

Created with [Cursor](https://cursor.sh/).

## Recent Changes

- **Mobile UI Optimization**: Condensed vertical spacing in PasskeyWalkthrough component to prevent button overlap on iPhone 15 Pro Max and similar mobile devices

## License

This project is an educational demonstration and is not licensed for public use or redistribution.
