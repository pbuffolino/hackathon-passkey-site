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
    answer: 'Good news! Many passkeys can sync across your devices (like your iPhone, iPad, and Mac, or your Android phone and tablet). So even if you lose one device, you can still access your accounts from your other devices. Some passkeys can also be backed up to your cloud account. If your passkeys do not sync or back up, you may need to create new passkeys on your new device.',
  },
  {
    question: 'Can I use passkeys on multiple devices?',
    answer: 'Yes! Many passkeys sync across your devices automatically. For example, if you create a passkey on your iPhone, it might also work on your iPad and Mac (if you\'re signed into the same Apple account). The exact behavior depends on your device and the website, but most modern passkeys are designed to work across your devices.',
  },
  {
    question: 'Are passkeys really more secure than passwords?',
    answer: 'Yes. Passkeys are much more secure because they are built to ignore fake websites, they do not reuse a password that can be phished, and the secret part stays on your device instead of being stored as a password on the website. If a website is hacked, attackers still do not get your passkey.',
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
    answer: 'If someone steals your phone, they still need your fingerprint, face, or PIN to unlock it and use your passkeys. You should lock or erase the device if it is lost, and remove passkeys or sign out of important accounts from another device if you can.',
  },
  {
    question: 'Can I use passkeys on websites that don\'t support them yet?',
    answer: 'Not yet. The website needs to add passkey support first. But you can still use passwords on those sites while you wait. As more websites see how popular and secure passkeys are, more of them will add support. It\'s just a matter of time!',
  },
  {
    question: 'Are passkeys free to use?',
    answer: 'Yes. If your phone or computer supports passkeys, you can use them at no extra cost. You do not have to buy anything extra or pay a fee to use them on websites that support passkeys. Some people choose to buy a separate security key, but you do not need one to start using passkeys.',
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers in plain English.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 overflow-hidden transition-all hover:border-[#00D9FF]/50 shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 transition-all ${
                  openIndex === index ? 'rounded-t-xl' : 'rounded-xl'
                }`}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
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
                <div className="px-6 pt-0 pb-5 border-t border-slate-200/50 dark:border-gray-800/50">
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-lg pt-5">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
