/**
 * FAQ Section
 * Displays frequently asked questions in an accordion format
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Ice Snow Coin (ISC)?',
    answer: 'ISC is a BEP-20 utility token on BNB Smart Chain, powering an AI-driven GameFi and NFT ecosystem. It features staking rewards (5-15% APY), NFT minting, and real-world asset (RWA) integration.',
  },
  {
    question: 'Is the contract safe? Has it been audited?',
    answer: 'The ISC contract is fully verified on BscScan with open-source MIT-licensed code. Contract ownership has been renounced, meaning no one can mint new tokens or modify the contract. A professional third-party security audit is currently in progress.',
  },
  {
    question: 'How do I stake ISC and earn rewards?',
    answer: 'You can stake ISC through our official staking portal or partner DeFi platforms. APY ranges from 5% to 15% depending on lock-up duration. Rewards are distributed automatically via smart contract.',
  },
  {
    question: 'What is the total supply? Can more tokens be created?',
    answer: 'Total supply is fixed at 202,600,000 ISC. No additional tokens can ever be minted because the contract ownership has been renounced and there is no accessible minting function.',
  },
  {
    question: 'What makes ISC different from other tokens?',
    answer: 'ISC combines AI-powered GameFi mechanics, NFT utility, and real-world asset backing. Unlike pure meme tokens, ISC has a sustainable economic model with staking, burning mechanisms, and ecosystem partnerships.',
  },
  {
    question: 'Where can I trade ISC?',
    answer: 'ISC is available on PancakeSwap (BSC). Always use the verified contract address: 0x11229a3f976566FA8a3ba462C432122f3B8876f6.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'tween' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ISC
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: 'tween' }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05, type: 'tween' }}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left"
              >
                <div className="relative group/item">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-colors duration-300 cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-semibold text-foreground group-hover/item:text-cyan-400 transition-colors duration-300">
                        {item.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, type: 'tween' }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, type: 'tween' }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/3 backdrop-blur-sm border border-cyan-500/10 border-t-0 rounded-b-lg p-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
