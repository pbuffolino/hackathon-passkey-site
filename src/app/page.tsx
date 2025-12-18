import PasskeyWalkthrough from './components/PasskeyWalkthrough';
import MFALeaderboard from './components/MFALeaderboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Remembering.
            <br />
            <span className="text-gradient-electric">Start Recognizing.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Replace passwords with biometrics. Passkeys use your fingerprint, face, or device PIN to keep your accounts secure—no typing required.
          </p>
        </div>
      </section>

      {/* Why Section - Feature Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Passkeys?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three powerful reasons to make the switch
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
                Phishing Proof
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Cryptographic binding ensures your passkey only works with the exact website it was created for. No more falling for fake login pages.
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
                Zero Friction
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                No more typing passwords. Just use your fingerprint, face, or device PIN. It's faster, easier, and more secure.
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
                Secure by Design
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Your private keys never leave your device. They're stored securely in your device's secure chip, protected from hackers and breaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Passkey Walkthrough */}
      <PasskeyWalkthrough />

      {/* MFA Leaderboard Comparison */}
      <MFALeaderboard />

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            The Passkey Pilot — Learn how passkeys work
          </p>
        </div>
      </footer>
    </div>
  );
}
