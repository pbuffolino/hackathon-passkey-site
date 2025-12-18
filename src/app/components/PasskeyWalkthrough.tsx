'use client';

import { useState } from 'react';

type Step = {
  id: number;
  title: string;
  explanation: string;
  visual: 'button' | 'biometric' | 'keygen' | 'publickey' | 'success';
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Initiate Registration',
    explanation: 'When you click this button, your browser starts creating a unique digital key pair - one public (shared with the website) and one private (stays on your device).',
    visual: 'button',
  },
  {
    id: 2,
    title: 'Biometric Authentication',
    explanation: 'Your device asks you to verify your identity using your fingerprint, face, or device PIN. This ensures only you can create this passkey.',
    visual: 'biometric',
  },
  {
    id: 3,
    title: 'Key Generation',
    explanation: 'Your device generates a unique cryptographic key pair. The private key never leaves your device - it\'s stored securely in your device\'s secure chip.',
    visual: 'keygen',
  },
  {
    id: 4,
    title: 'Public Key Registration',
    explanation: 'Only the public key is sent to the website. Think of it like a lock - anyone can see it, but only your private key can unlock it.',
    visual: 'publickey',
  },
  {
    id: 5,
    title: 'Success & Future Logins',
    explanation: 'You\'re all set! Next time you log in, you\'ll just use your fingerprint or face - no password needed. The website uses your public key to verify your identity.',
    visual: 'success',
  },
];

export default function PasskeyWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
  };

  const renderVisual = () => {
    switch (step.visual) {
      case 'button':
        return (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <button
              className="px-8 py-4 bg-[#00D9FF] text-black font-semibold rounded-lg text-lg transition-all hover:bg-[#00B8D4] hover:scale-105 shadow-lg shadow-[#00D9FF]/30"
              onClick={handleNext}
            >
              Register Passkey
            </button>
          </div>
        );
      case 'biometric':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#00D9FF]/20 flex items-center justify-center animate-pulse-slow">
                  <svg
                    className="w-12 h-12 text-[#00D9FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.78c.017-.23.032-.46.032-.701 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 .241.015.471.032.701M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.78c-.017.23-.032.46-.032.701 0 4.97 4.03 9 9 9s9-4.03 9-9c0-.241-.015-.471-.032-.701M12 11a9 9 0 01-9 9m9-9a9 9 0 019 9m-9-9v.01M3 20v.01M21 20v.01"
                    />
                  </svg>
                </div>
                <p className="text-white text-lg font-medium">Identifying...</p>
              </div>
            </div>
          </div>
        );
      case 'keygen':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00B8D4] flex items-center justify-center animate-pulse-slow shadow-lg shadow-[#00D9FF]/50">
                <svg
                  className="w-16 h-16 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-300 text-sm">Private Key</p>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-2 h-2 bg-[#00D9FF] rounded-full"></div>
                <p className="text-[#00D9FF] text-xs font-mono">Stays on your device</p>
              </div>
            </div>
          </div>
        );
      case 'publickey':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-lg bg-gray-800 border-2 border-[#00D9FF] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#00D9FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs">Your Device</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-[#00D9FF]"></div>
                <svg
                  className="w-6 h-6 text-[#00D9FF] animate-pulse-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="w-12 h-0.5 bg-[#00D9FF]"></div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-lg bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs">Website Server</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">Only the public key is shared</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white text-2xl font-semibold">Passkey Created!</p>
              <p className="text-gray-400">You're ready to use biometric login</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            The Passkey Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how passkey enrollment works, step by step
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Visual Simulation */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 min-h-[400px] flex items-center justify-center">
            <div className="w-full animate-fade-in">
              {renderVisual()}
            </div>
          </div>

          {/* Educational Explanation Panel */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00D9FF] text-black font-bold flex items-center justify-center">
                  {step.id}
                </div>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {step.explanation}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleStartOver}
                className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              >
                Start Over
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={handleStartOver}
                  className="px-8 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                >
                  Try Again
                </button>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    idx <= currentStep
                      ? 'bg-[#00D9FF]'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

