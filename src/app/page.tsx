import PasskeyWalkthrough from './components/PasskeyWalkthrough';
import MFALeaderboard from './components/MFALeaderboard';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
            One tap to sign in.
            <span className="block text-gradient-electric mt-2 sm:mt-0 lg:block lg:mt-2">
              No password to steal.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Passkeys use the same unlock you already trust on your phone or laptop, but for websites and apps.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="#demo"
              className="w-full sm:w-auto px-8 py-4 bg-[#00D9FF] text-black font-bold text-lg rounded-full hover:bg-[#00B8D4] hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)]"
            >
              Try the Live Demo
            </a>
            <a 
              href="#leaderboard"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gray-700 text-white font-semibold text-lg rounded-full hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all"
            >
              Compare Security
            </a>
          </div>
        </div>
      </section>

      {/* Passkeys in 30 seconds - Consolidated Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Passkeys, in 30 seconds
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Block A: What it is */}
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800 flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-[#00D9FF]/20 flex items-center justify-center mb-6">
                <span className="text-[#00D9FF] font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">What it is</h3>
              <div className="space-y-4 text-gray-300 text-base sm:text-lg flex-grow leading-relaxed">
                <p>A passkey is a sign-in key your device creates for a specific site or app.</p>
                <p>You unlock it with Face ID, Touch ID, fingerprint, or device PIN.</p>
              </div>
            </div>

            {/* Block B: Why it matters */}
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800 flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-[#00D9FF]/20 flex items-center justify-center mb-6">
                <span className="text-[#00D9FF] font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Why it matters</h3>
              <ul className="space-y-3 text-gray-300 text-base sm:text-lg flex-grow leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-[#00D9FF] mt-1">✓</span>
                  <span>Helps stop fake login pages (phishing — fake sites or messages that try to steal your password)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00D9FF] mt-1">✓</span>
                  <span>Faster than passwords and codes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00D9FF] mt-1">✓</span>
                  <span>No reusable secret to steal</span>
                </li>
              </ul>
            </div>

            {/* Block C: Where you'll see it */}
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800 flex flex-col h-full">
               <div className="w-12 h-12 rounded-lg bg-[#00D9FF]/20 flex items-center justify-center mb-6">
                <span className="text-[#00D9FF] font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Where you'll see it</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Email', 'Banking', 'Shopping', 'Social', 'Work apps', 'Developer tools'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-base rounded-full border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-base italic mt-auto leading-relaxed">
                Support varies by site and device, but adoption is growing.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base font-medium">
            <a href="#demo" className="text-[#00D9FF] hover:text-[#00B8D4] flex items-center space-x-2 hover:underline">
              <span>Jump to the demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
            <a href="#leaderboard" className="text-gray-400 hover:text-white flex items-center space-x-2 transition-colors">
              <span>See the comparison</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Passkey Walkthrough */}
      <div id="demo" className="scroll-mt-24">
        <PasskeyWalkthrough />
      </div>

      {/* MFA Leaderboard Comparison */}
      <div id="leaderboard" className="scroll-mt-24">
        <MFALeaderboard />
      </div>


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
