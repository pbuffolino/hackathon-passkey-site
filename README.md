# The Passkey Pilot

An interactive educational website that demonstrates how passkeys work and compares them to traditional MFA methods, designed for everyday users to understand and adopt passkey authentication.

## Purpose

The Passkey Pilot is designed to educate everyday users about passkeys—a modern, phishing-resistant authentication method that replaces passwords with biometric authentication (fingerprint, face recognition, or device PIN). The site provides:

- **Interactive Walkthrough**: A hands-on demonstration of the passkey registration and authentication process using the WebAuthn API
- **MFA Comparison**: A visual leaderboard comparing passkeys to other multi-factor authentication methods
- **FAQ Section**: Common questions answered in plain, beginner-friendly language

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **WebAuthn API**: For actual passkey creation and authentication
- **CBOR Decoding**: `cbor-x` library for decoding WebAuthn credential data
- **React Compiler**: Enabled via Next.js config for optimized React rendering

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
└── package.json                          # Dependencies and scripts
```

### Key Components

#### `page.tsx` (Main Landing Page)
- **Hero Section**: High-impact "One tap to sign in" messaging with "Try the Live Demo" and "Compare Security" CTAs.
- **Passkeys in 30 Seconds**: Consolidated "What / Why / Where" section for quick understanding.
- **Smooth Scrolling**: Implemented smooth scroll to anchor sections (`#demo`, `#leaderboard`).

#### `PasskeyWalkthrough.tsx`

The core interactive component that demonstrates the passkey lifecycle:

- **Registration Flow**: Shows the 5-step process of creating a passkey (initiation → biometric → key generation → public key registration → success)
- **Authentication Flow**: Demonstrates passkey validation during login
- **Technical Details (Registration)**: Displays comprehensive credential metadata including:
  - Credential ID (shortened and full)
  - Attestation format (from attestationObject)
  - Hardware type (derived from transports)
  - Cryptographic algorithm (extracted from COSE key)
  - User verification status (from authData flags)
  - Authenticator attachment (platform vs cross-platform)
  - Attestation conveyance preference
  - Sign count (counter for clone detection)
  - AAGUID (Authenticator Attestation Globally Unique Identifier)
  - Backup eligible and backup state flags (WebAuthn Level 3)
  - RP ID hash (SHA-256 hash binding credential to origin)
  - Origin (from clientDataJSON)
- **Technical Details (Validation)**: Shows authentication metadata including:
  - Credential ID match verification
  - Sign count from assertion
  - User verification status
  - Origin verification
  - Signature presence and length
- **Dual View Modes**: Toggle between simple explanations and technical details for both registration and validation flows
- Uses the WebAuthn API (`navigator.credentials.create()` and `navigator.credentials.get()`) for real passkey operations
- Parses CBOR-encoded attestation objects and authenticator data to extract WebAuthn specification properties

#### `MFALeaderboard.tsx`

A visual comparison of authentication methods:

- **Leaderboard UI**: Compares 8 common authentication methods in a vendor-agnostic format.
- **Tooltips**: Hover-over explanations for icons (Phishing Resistance, Device Binding) to clarify "Depends", "Yes", "No", etc.
- **Visuals**: Uses color-coded icons (Green/Red/Yellow) to indicate status clearly.
- **Rankings**: Ranks methods by security strength (Very Weak → Maximum).

#### `FAQ.tsx`

A beginner-friendly FAQ component:

- 10 common questions about passkeys answered in plain language
- Covers topics like device requirements, security, multi-device usage, and compatibility
- Expandable accordion interface with clean visual separation between questions and answers
- Written for non-technical users with relatable examples
- Includes links to authoritative sources (passkeys.dev and FIDO Alliance) for additional information

## Getting Started

### Prerequisites

- Node.js 18+ (or compatible runtime)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository (if applicable) or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/hackathon-passkey-site](http://localhost:3000/hackathon-passkey-site) in your browser to see the application.

> **Note**: The `/hackathon-passkey-site` path is required due to the `basePath` configuration for GitHub Pages deployment. To develop at the root path, temporarily comment out `basePath` and `assetPrefix` in `next.config.ts`.

The page will automatically reload when you make changes to the code.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

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
  - Registration: Credential ID, attestation format, hardware type, algorithm, user verification, sign count, AAGUID, backup flags, RP ID hash, and origin
  - Validation: Credential match, sign count, user verification, origin verification, and signature details
- "What Just Happened?" panels for both enrollment and authentication flows
- Error handling for unsupported browsers or failed operations

### Educational Content

- "Passkeys 101" introductory section explaining concepts simply
- FAQ section with 10 common questions and links to authoritative sources
- MFA comparison table with simplified headers and tooltips
- "Still Have Questions" section at the bottom with links to passkeys.dev and FIDO Alliance resources

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Dark theme with electric blue accent color (`#00D9FF`)
- Smooth animations and transitions
- Accessible UI components

### Browser Compatibility

- Requires a modern browser with WebAuthn support
- Works best with browsers that support platform authenticators (Touch ID, Face ID, Windows Hello, etc.)
- Graceful degradation with error messages for unsupported browsers

## Configuration

### Next.js Config (`next.config.ts`)

- React Compiler enabled for optimized rendering
- Additional configuration can be added here as needed

### TypeScript Config (`tsconfig.json`)

- Strict type checking enabled
- Path aliases configured (`@/*` maps to `./src/*`)
- ES2017 target with modern module resolution

### Tailwind CSS

- Configured via PostCSS (`postcss.config.mjs`)
- Custom color scheme with electric blue accent
- Global styles defined in `globals.css`

## Instructions for Coding Assistants

If you need to make changes to this project, here are important details to keep in mind:

### Architecture Patterns

- **App Router**: This project uses Next.js App Router (not Pages Router). Components are in `src/app/`
- **Client Components**: Components using hooks or browser APIs (like `PasskeyWalkthrough`) must have `'use client'` directive
- **Server Components**: Default components are server components unless marked with `'use client'`

### WebAuthn Implementation

- The `PasskeyWalkthrough` component uses real WebAuthn API calls
- Challenges and user IDs are hard-coded for demo purposes (not production-ready)
- Credential data is decoded using `cbor-x` library
- Comprehensive parsing of WebAuthn specification properties:
  - Attestation object (CBOR) decoding for format and authData
  - Authenticator data (authData) parsing for flags, sign count, AAGUID, and COSE key
  - Client data JSON parsing for origin verification
  - Transport mechanism extraction for hardware type identification
- Error handling should account for browser compatibility and user cancellation

### Styling Guidelines

- Use Tailwind CSS utility classes
- Primary accent color: `#00D9FF` (electric blue)
- Dark theme: black background (`bg-black`) with gray accents
- Responsive breakpoints: `sm:`, `md:`, `lg:` prefixes
- Custom gradient class: `text-gradient-electric` (defined in `globals.css`)

### Component Structure

- Each major section is a separate component in `src/app/components/`
- Main page (`page.tsx`) composes these components
- Components are self-contained with their own state management
- TypeScript types are defined within component files

### Adding New Features

1. Create new components in `src/app/components/`
2. Import and use in `page.tsx` or other components
3. Follow existing patterns for styling and state management
4. Ensure TypeScript types are properly defined
5. Test WebAuthn features in supported browsers

### Testing Considerations

- WebAuthn requires HTTPS in production (localhost is exempt)
- Test on devices with biometric authentication (Touch ID, Face ID, etc.)
- Verify error handling for unsupported browsers
- Check responsive design on mobile devices

### Dependencies

- **cbor-x**: Used for decoding CBOR-encoded WebAuthn credential data
- **next/font**: Optimized font loading (Geist Sans and Geist Mono)
- All other dependencies are standard Next.js/React packages

## Live Demo

**🚀 Try it now:** [https://pbuffolino.github.io/hackathon-passkey-site/](https://pbuffolino.github.io/hackathon-passkey-site/)

## Deployment

This project is deployed to **GitHub Pages** as a static site.

### Deploy to GitHub Pages

1. Build and deploy with a single command:

```bash
npm run deploy
```

This runs `next build` with static export and pushes to the `gh-pages` branch.

2. Configure GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`

### Configuration Notes

- **Static Export**: The site uses `output: 'export'` in `next.config.ts` for static HTML generation
- **Base Path**: Configured as `/hackathon-passkey-site` for GitHub Pages subdirectory hosting
- **Jekyll Bypass**: A `.nojekyll` file is included to prevent GitHub Pages from ignoring the `_next` folder

### Alternative Deployment

For server-side rendering features, deploy to [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build

**Note**: WebAuthn API requires HTTPS in production environments. GitHub Pages and Vercel both provide HTTPS by default.

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

- **Mobile Responsiveness**: Implemented card-based mobile view for MFA Leaderboard table, added smooth CSS transitions, and optimized PasskeyWalkthrough layout for small screens.
- **Accessibility**: Increased touch targets to minimum 44px for interactive elements and enhanced font weights and sizes for better readability.
- **Content Update**: Updated "Quick Answer" text in MFA Leaderboard to be more accurate ("one of the most secure").
- **UI Improvements**: Fixed padding and layout for the "Possession, Inherence, etc..." boxes in the MFA Leaderboard, specifically improving the FIDO2 Hardware Security Key display.
- **Demo Optimization**: Optimized "Try it Yourself" demo for mobile devices (reduced padding, simplified content) and added auto-scroll behavior for better navigation focus.
- **Mobile UX Improvements**: Condensed vertical spacing in demo boxes, improved font weights and sizes for better readability, simplified step titles and descriptions to prevent layout issues on mobile devices.

## License

This project is private and not licensed for public use.
