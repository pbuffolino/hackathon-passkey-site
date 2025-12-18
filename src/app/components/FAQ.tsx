'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'Do I need special hardware to use passkeys?',
    answer: 'Not at all! If your phone or computer has a fingerprint reader, face recognition (like Face ID or Windows Hello), or even just a PIN code, you can use passkeys. Most modern devices already have everything you need.',
  },
  {
    question: 'What if I lose my device?',
    answer: 'Good news! Many passkeys can sync across your devices (like your iPhone, iPad, and Mac, or your Android phone and tablet). So even if you lose one device, you can still access your accounts from your other devices. Some passkeys can also be backed up to your cloud account.',
  },
  {
    question: 'Can I use passkeys on multiple devices?',
    answer: 'Yes! Many passkeys sync across your devices automatically. For example, if you create a passkey on your iPhone, it might also work on your iPad and Mac (if you\'re signed into the same Apple account). The exact behavior depends on your device and the website, but most modern passkeys are designed to work across your devices.',
  },
  {
    question: 'Are passkeys really more secure than passwords?',
    answer: 'Yes! Passkeys are much more secure because: (1) They can\'t be tricked by fake websites, (2) They can\'t be guessed or stolen like passwords, (3) The secret part never leaves your device, and (4) They require your fingerprint, face, or PIN, something only you have. Even if a website gets hacked, your passkey stays safe.',
  },
  {
    question: 'What websites support passkeys?',
    answer: 'More and more websites are adding passkey support every day! Major companies like Google, Microsoft, Apple, Amazon, PayPal, and many banks already support passkeys. When you see an option to "Use a passkey" or "Sign in with Face ID/Touch ID" on a login page, that means they support it.',
  },
  {
    question: 'Do I still need passwords if I use passkeys?',
    answer: 'It depends on the website. Some websites let you use only passkeys (no password needed!). Others might still require a password as a backup option. As more websites adopt passkeys, you\'ll need fewer and fewer passwords. Eventually, you might not need passwords at all!',
  },
  {
    question: 'What if someone steals my phone?',
    answer: 'Your passkey is still safe! Even if someone has your phone, they can\'t use your passkey without your fingerprint, face, or PIN. That\'s the whole point. The passkey requires something only you have (your biometric) to work. Plus, you can usually disable or delete passkeys from your other devices if your phone is lost or stolen.',
  },
  {
    question: 'Can I use passkeys on websites that don\'t support them yet?',
    answer: 'Not yet. The website needs to add passkey support first. But you can still use passwords on those sites while you wait. As more websites see how popular and secure passkeys are, more of them will add support. It\'s just a matter of time!',
  },
  {
    question: 'Are passkeys free to use?',
    answer: 'Yes! Passkeys are completely free. You don\'t need to buy anything special, and websites don\'t charge you to use them. They\'re built into your device and the websites you visit.',
  },
  {
    question: 'What\'s the difference between a passkey and Face ID or Touch ID?',
    answer: 'Face ID and Touch ID are the ways your device recognizes you (your fingerprint or face). A passkey is what gets created and stored on your device after you use Face ID or Touch ID. Think of it this way: Face ID/Touch ID is the lock on your phone, and a passkey is a special key that works with a specific website.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first question by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers in plain English.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all hover:border-[#00D9FF]/50"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 rounded-xl"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#00D9FF] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-gray-300 text-lg">
              Still have questions?{' '}
              <span className="text-[#00D9FF]">Passkeys are still new, so it's normal to have questions!</span> The best way to learn is to try creating one yourself using the interactive demo above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

