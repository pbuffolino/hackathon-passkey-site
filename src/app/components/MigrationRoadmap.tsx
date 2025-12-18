type RoadmapStep = {
  number: number;
  title: string;
  description: string;
};

const steps: RoadmapStep[] = [
  {
    number: 1,
    title: 'Assess Current MFA Infrastructure',
    description: 'Take stock of your current security setup (passwords, text codes, authenticator apps) and figure out where passkeys can fit in.',
  },
  {
    number: 2,
    title: 'Plan Passkey Rollout Strategy',
    description: 'Create a step-by-step plan that works with your company\'s security rules and makes sense for your team.',
  },
  {
    number: 3,
    title: 'Beta Testing with Select Users',
    description: 'Start with a small group of people to test creating and using passkeys, and see what questions or issues come up.',
  },
  {
    number: 4,
    title: 'Gradual Rollout by Department',
    description: 'Roll out passkeys to one team or department at a time, making sure everyone has help and knows how to use them.',
  },
  {
    number: 5,
    title: 'Full Company-Wide Deployment',
    description: 'Once everything is working smoothly, roll out passkeys to everyone in your organization, replacing old password methods.',
  },
];

export default function MigrationRoadmap() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#00D9FF]/20 border border-[#00D9FF]/50 rounded-full mb-4">
            <span className="text-[#00D9FF] text-sm font-semibold uppercase tracking-wide">For Organizations & IT Teams</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Migration Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            A step-by-step guide for organizations moving from traditional passwords to passkeys
          </p>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            <span className="font-semibold text-white">For personal use?</span> You can start using passkeys right away on any website that supports them. No migration needed!
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex items-start">
                {/* Timeline Marker */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#00D9FF] flex items-center justify-center border-4 border-black shadow-lg shadow-[#00D9FF]/30">
                    <span className="text-black font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-6 md:ml-8 flex-1 pt-2">
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-[#00D9FF]/50 transition-all">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

