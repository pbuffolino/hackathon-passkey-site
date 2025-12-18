import PasskeyWalkthrough from './components/PasskeyWalkthrough';
import MFALeaderboard from './components/MFALeaderboard';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Remembering Passwords.
            <br />
            <span className="text-gradient-electric">Start Using Your Face or Fingerprint.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Passkeys are like passwords, but instead of typing them, you use your fingerprint, face, or device PIN. They're faster, easier, and much more secure.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Already used Face ID or Touch ID to unlock your phone? That's the same idea, but for logging into websites and apps.
          </p>
        </div>
      </section>

      {/* Passkeys 101 - Simple Introduction */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What is a Passkey?
              </h2>
              <p className="text-xl text-gray-300">
                Think of it like a house key, but it's your fingerprint
              </p>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center mt-1">
                  <span className="text-[#00D9FF] font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">A passkey is like a password, but better</p>
                  <p>Instead of creating and remembering a password, your device creates a special key that only works with your fingerprint, face, or PIN. You never have to type anything.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center mt-1">
                  <span className="text-[#00D9FF] font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">It only works on the real website</p>
                  <p>Your passkey is like a key that only fits one lock. Even if someone tricks you into visiting a fake website, your passkey won't work there. This protects you from phishing scams.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center mt-1">
                  <span className="text-[#00D9FF] font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">It stays on your device</p>
                  <p>The secret part of your passkey never leaves your phone or computer. It's stored safely in your device's secure chip, the same place that protects your Face ID or Touch ID.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">Where can I use passkeys?</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#00D9FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Banking apps</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#00D9FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Email accounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#00D9FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Social media</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#00D9FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Shopping sites</span>
                </div>
              </div>
              <p className="mt-4 text-gray-400 text-sm">More websites are adding passkey support every day!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Feature Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Use Passkeys?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple reasons to make the switch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phishing Proof */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-[#00D9FF]/50 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-[#00D9FF]/20 flex items-center justify-center mb-6 group-hover:bg-[#00D9FF]/30 transition-colors">
                <svg
                  className="w-8 h-8 text-[#00D9FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Can't Be Tricked by Fake Websites
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Your passkey only works with the real website it was created for. Even if someone tricks you into visiting a fake login page, your passkey won't work there. No more falling for phishing scams.
              </p>
            </div>

            {/* Zero Friction */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-[#00D9FF]/50 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-[#00D9FF]/20 flex items-center justify-center mb-6 group-hover:bg-[#00D9FF]/30 transition-colors">
                <svg
                  className="w-8 h-8 text-[#00D9FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Super Fast and Easy
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                No more typing long passwords or waiting for text message codes. Just use your fingerprint, face, or device PIN, the same way you unlock your phone. It's faster, easier, and more secure.
              </p>
            </div>

            {/* Secure by Design */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-[#00D9FF]/50 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-[#00D9FF]/20 flex items-center justify-center mb-6 group-hover:bg-[#00D9FF]/30 transition-colors">
                <svg
                  className="w-8 h-8 text-[#00D9FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Your Secret Stays on Your Device
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                The secret part of your passkey never leaves your phone or computer. It's stored safely in your device's secure chip, the same technology that protects your Face ID or Touch ID. Even if a website gets hacked, your passkey stays safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Passkey Walkthrough */}
      <PasskeyWalkthrough />

      {/* MFA Leaderboard Comparison */}
      <MFALeaderboard />

      {/* Key Terms Glossary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Key Terms Explained
            </h2>
            <p className="text-gray-400 text-center mb-8">
              A quick reference for terms you might come across
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Passkey</h3>
                  <p className="text-gray-300 text-sm">A digital key that uses your fingerprint, face, or PIN instead of a password. It's stored on your device and only works with the website it was created for.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Biometric</h3>
                  <p className="text-gray-300 text-sm">A way to identify you using something unique about your body, like your fingerprint or face. Face ID and Touch ID are examples of biometrics.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Phishing</h3>
                  <p className="text-gray-300 text-sm">When scammers create fake websites that look real to trick you into entering your password. Passkeys protect you from this because they won't work on fake sites.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Knowledge vs Inherence</h3>
                  <p className="text-gray-300 text-sm">
                    <span className="text-red-400">Knowledge</span> (something you know, like passwords) is the weakest because it can be guessed, stolen, or forgotten.{' '}
                    <span className="text-[#00D9FF]">Inherence</span> (something you are, like your fingerprint or face) is the strongest because it's unique to you and can't be stolen or guessed.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Device-bound</h3>
                  <p className="text-gray-300 text-sm">Means your passkey is tied to your specific device. Some passkeys can sync across your devices (like your iPhone and iPad), while others only work on one device.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">MFA / Multi-Factor Authentication</h3>
                  <p className="text-gray-300 text-sm">Using more than one way to prove it's you, like a password plus a text code. Passkeys are a type of MFA that's more secure and easier to use.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">WebAuthn</h3>
                  <p className="text-gray-300 text-sm">The technical standard that makes passkeys work. You don't need to know this. It's just the behind-the-scenes technology that powers passkeys on websites.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">NIST Authentication Assurance Levels (AAL)</h3>
                  <p className="text-gray-300 text-sm">
                    Standards used by government and security experts to rate security methods.{' '}
                    <span className="font-semibold text-white">AAL2</span> means the method uses multiple factors (like password + text code) and protects against fake websites. Text message codes and email links are <span className="text-red-400">not</span> safe from fake websites—scammers can trick you into giving them the code.{' '}
                    <span className="font-semibold text-white">AAL3</span> is the highest level. It requires protection from fake websites and ensures your secret key can't be copied or stolen. The exact security level depends on how it's set up. These ratings are based on industry standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Still Have Questions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-gray-300 text-lg mb-4">
              Still have questions?{' '}
              <span className="text-[#00D9FF]">Passkeys are still new, so it's normal to have questions!</span> The best way to learn is to try creating one yourself using the interactive demo above.
            </p>
            <p className="text-gray-400 text-base">
              For more information, check out{' '}
              <a
                href="https://passkeys.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                passkeys.dev
              </a>
              {' '}or the{' '}
              <a
                href="https://fidoalliance.org/passkeys/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                FIDO Alliance
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gray-400">
            The Passkey Pilot - Learn how passkeys work
          </p>
          <div className="text-gray-500 text-sm space-y-2">
            <p>
              Built with{' '}
              <a
                href="https://www.w3.org/TR/webauthn-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                WebAuthn API
              </a>
              {' '}and resources from{' '}
              <a
                href="https://passkeys.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                passkeys.dev
              </a>
              {' '}and the{' '}
              <a
                href="https://fidoalliance.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                FIDO Alliance
              </a>
            </p>
            <p className="text-gray-600">
              Created with{' '}
              <a
                href="https://cursor.sh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline transition-colors"
              >
                Cursor
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
