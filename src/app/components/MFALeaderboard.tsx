type MFAMethod = {
  name: string;
  factorType: string;
  description: string;
  strength: 'Very Weak' | 'Weak' | 'Moderate' | 'Very Strong' | 'Maximum';
  phishResistant: boolean;
  highlighted?: boolean; // For electric blue glow
};

const methods: MFAMethod[] = [
  {
    name: 'Password',
    factorType: 'Knowledge',
    description: 'A shared secret stored on a server.',
    strength: 'Very Weak',
    phishResistant: false,
  },
  {
    name: 'Security Questions',
    factorType: 'Knowledge',
    description: 'Easily social-engineered "secrets."',
    strength: 'Very Weak',
    phishResistant: false,
  },
  {
    name: 'SMS / Voice',
    factorType: 'Possession',
    description: 'A code sent over unencrypted cell networks.',
    strength: 'Weak',
    phishResistant: false,
  },
  {
    name: 'TOTP (Authenticator)',
    factorType: 'Possession',
    description: 'A 6-digit code that changes every 30s.',
    strength: 'Moderate',
    phishResistant: false,
  },
  {
    name: 'Okta Verify (Push)',
    factorType: 'Possession',
    description: 'A "Yes/No" prompt sent to your phone.',
    strength: 'Moderate',
    phishResistant: false,
  },
  {
    name: 'Okta Fastpass',
    factorType: 'Possession + Inherence',
    description: 'Device-bound cryptographic check + Biometric.',
    strength: 'Very Strong',
    phishResistant: true,
    highlighted: true,
  },
  {
    name: 'Passkeys',
    factorType: 'Possession + Inherence',
    description: 'FIDO2 credential stored in a secure chip.',
    strength: 'Very Strong',
    phishResistant: true,
    highlighted: true,
  },
  {
    name: 'Yubikey',
    factorType: 'Possession',
    description: 'Physical hardware key (The Gold Standard).',
    strength: 'Maximum',
    phishResistant: true,
    highlighted: true,
  },
];

const getStrengthColor = (strength: MFAMethod['strength']) => {
  switch (strength) {
    case 'Very Weak':
      return 'bg-red-500';
    case 'Weak':
      return 'bg-orange-500';
    case 'Moderate':
      return 'bg-yellow-500';
    case 'Very Strong':
      return 'bg-cyan-500';
    case 'Maximum':
      return 'bg-[#00D9FF]';
    default:
      return 'bg-gray-500';
  }
};

const getStrengthWidth = (strength: MFAMethod['strength']) => {
  switch (strength) {
    case 'Very Weak':
      return 'w-1/5';
    case 'Weak':
      return 'w-2/5';
    case 'Moderate':
      return 'w-3/5';
    case 'Very Strong':
      return 'w-4/5';
    case 'Maximum':
      return 'w-full';
    default:
      return 'w-1/2';
  }
};

export default function MFALeaderboard() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            MFA Method Comparison
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how different authentication methods stack up
          </p>
        </div>

        {/* Glassmorphism Table Container */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-gray-900/40 rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl">
            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      MFA Method
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Factor Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Strength
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Phish Resistant
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/30">
                  {methods.map((method, index) => (
                    <tr
                      key={index}
                      className={`transition-all hover:bg-gray-800/20 ${
                        method.highlighted
                          ? 'border-l-4 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white font-medium text-lg">
                          {method.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300">
                          {method.factorType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-400 text-base max-w-md">
                          {method.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5 overflow-hidden">
                            <div
                              className={`h-full ${getStrengthColor(
                                method.strength
                              )} ${getStrengthWidth(method.strength)} transition-all`}
                            />
                          </div>
                          <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
                            {method.strength}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {method.phishResistant ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Legend */}
        <div className="mt-12 text-center">
          <div className="inline-block backdrop-blur-xl bg-gray-900/40 rounded-xl border border-gray-800/50 px-8 py-6 max-w-3xl">
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="font-semibold text-white">Understanding Factor Types:</span>{' '}
              <span className="text-red-400">"Something you Know"</span> (Knowledge) is the weakest link and easily compromised.{' '}
              <span className="text-[#00D9FF]">"Something you Are"</span> (Inherence/Biometrics) is the strongest, as it's unique to you and cannot be stolen or guessed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

