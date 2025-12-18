# The Passkey Pilot

An interactive educational website that demonstrates how passkeys work, compares them to traditional MFA methods, and provides guidance for migrating to passkey-based authentication.

## Purpose

The Passkey Pilot is designed to educate users and developers about passkeys—a modern, phishing-resistant authentication method that replaces passwords with biometric authentication (fingerprint, face recognition, or device PIN). The site provides:

- **Interactive Walkthrough**: A hands-on demonstration of the passkey registration and authentication process using the WebAuthn API
- **MFA Comparison**: A visual leaderboard comparing passkeys to other multi-factor authentication methods
- **Migration Guidance**: A roadmap for organizations looking to migrate from traditional MFA to passkeys

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
│       │   └── MigrationRoadmap.tsx      # Migration steps component
│       ├── page.tsx                      # Main landing page
│       ├── layout.tsx                    # Root layout with metadata
│       └── globals.css                   # Global styles and Tailwind config
├── public/                               # Static assets
├── next.config.ts                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json                          # Dependencies and scripts
```

### Key Components

#### `PasskeyWalkthrough.tsx`

The core interactive component that demonstrates the passkey lifecycle:

- **Registration Flow**: Shows the 5-step process of creating a passkey (initiation → biometric → key generation → public key registration → success)
- **Authentication Flow**: Demonstrates passkey validation during login
- **Technical Details**: Displays credential metadata including credential ID, attestation format, hardware type, and cryptographic algorithms
- Uses the WebAuthn API (`navigator.credentials.create()` and `navigator.credentials.get()`) for real passkey operations

#### `MFALeaderboard.tsx`

A visual comparison of authentication methods:

- Ranks methods by security strength (Very Weak → Maximum)
- Highlights phishing resistance
- Shows factor types (Knowledge, Possession, Inherence)
- Emphasizes passkeys as the most secure option

#### `MigrationRoadmap.tsx`

A 5-step guide for organizations migrating to passkeys:

1. Assess Current MFA Infrastructure
2. Plan Passkey Rollout Strategy
3. Beta Testing with Select Users
4. Gradual Rollout by Department
5. Full Enterprise Deployment

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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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

### Interactive Passkey Demo

- Real WebAuthn API integration for actual passkey creation and authentication
- Step-by-step visual walkthrough of the passkey registration process
- Technical metadata display showing credential details
- Error handling for unsupported browsers or failed operations

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

## Deployment

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com), the platform from the creators of Next.js:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

**Note**: WebAuthn API requires HTTPS in production environments. Ensure your deployment uses HTTPS.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WebAuthn API Specification](https://www.w3.org/TR/webauthn-2/)
- [Passkeys.dev](https://passkeys.dev) - Comprehensive passkey resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is private and not licensed for public use.
