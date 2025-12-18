type RoadmapStep = {
  number: number;
  title: string;
  description: string;
};

const steps: RoadmapStep[] = [
  {
    number: 1,
    title: 'Assess Current MFA Infrastructure',
    description: 'Evaluate your existing multi-factor authentication setup and identify integration points for passkeys.',
  },
  {
    number: 2,
    title: 'Plan Passkey Rollout Strategy',
    description: 'Design a phased approach that aligns with your organization\'s security policies and user needs.',
  },
  {
    number: 3,
    title: 'Pilot Program with Select Users',
    description: 'Start with a small group of users to test passkey enrollment, authentication flows, and gather feedback.',
  },
  {
    number: 4,
    title: 'Gradual Rollout by Department',
    description: 'Expand passkey adoption department by department, ensuring support and training are in place.',
  },
  {
    number: 5,
    title: 'Full Enterprise Deployment',
    description: 'Complete the migration with organization-wide passkey support, replacing traditional MFA methods.',
  },
];

export default function MigrationRoadmap() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Migration Roadmap
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your journey from MFA to Passkeys
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

