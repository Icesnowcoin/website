/*
 * Design: Quantum Ice — DEX Trade Section
 * Collapsible card showing 12 DEX platforms for trading ISC
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ISC_CONTRACT = '0x11229a3f976566FA8a3ba462C432122f3B8876f6';

// 12 DEX platforms (removed MDEX, BabySwap, dYdX, 1inch)
const DEX_PLATFORMS = [
  { name: 'PancakeSwap', url: 'https://pancakeswap.finance', description: 'Leading BSC DEX' },
  { name: 'Biswap', url: 'https://biswap.org', description: 'BSC Exchange' },
  { name: 'ApeSwap', url: 'https://apeswap.finance', description: 'Multi-chain DEX' },
  { name: 'Nomiswap', url: 'https://nomiswap.io', description: 'Stable Swap' },
  { name: 'Thena', url: 'https://thena.fi', description: 'Optimized DEX' },
  { name: 'Uniswap', url: 'https://app.uniswap.org', description: 'Multi-chain DEX' },
  { name: 'SushiSwap', url: 'https://www.sushi.com', description: 'Community DEX' },
  { name: 'Curve', url: 'https://curve.fi', description: 'Stablecoin DEX' },
  { name: 'CowSwap', url: 'https://cow.fi', description: 'Intent-based DEX' },
  { name: 'ParaSwap', url: 'https://app.paraswap.io', description: 'DEX Aggregator' },
  { name: 'OpenOcean', url: 'https://openocean.finance', description: 'DEX Aggregator' },
  { name: 'KyberSwap', url: 'https://kyberswap.com', description: 'Multi-chain DEX' },
];

// SVG Logo components
const DexLogos: Record<string, () => React.ReactNode> = {
  PancakeSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#38A169" />
      <path d="M100 40 L140 80 L140 140 L100 160 L60 140 L60 80 Z" fill="#fff" />
      <circle cx="100" cy="100" r="30" fill="#38A169" />
    </svg>
  ),
  Biswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#00D4FF" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  ApeSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FF6B35" />
      <circle cx="85" cy="85" r="15" fill="#fff" />
      <circle cx="115" cy="85" r="15" fill="#fff" />
      <path d="M80 120 Q100 135 120 120" stroke="#fff" strokeWidth="4" fill="none" />
    </svg>
  ),
  Nomiswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#0066FF" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  Thena: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#00D4FF" />
      <path d="M100 60 L130 90 L100 120 L70 90 Z" fill="#fff" />
      <path d="M100 120 L130 150 L100 180 L70 150 Z" fill="#00D4FF" opacity="0.5" />
    </svg>
  ),
  Uniswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FF007A" />
      <path d="M100 50 L140 140 L60 140 Z" fill="#fff" />
    </svg>
  ),
  SushiSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FA52A0" />
      <circle cx="100" cy="100" r="40" fill="#fff" />
    </svg>
  ),
  Curve: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <defs>
        <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="50%" stopColor="#FFFF00" />
          <stop offset="100%" stopColor="#0000FF" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#curveGrad)" />
      <path d="M50 150 Q100 50 150 150" stroke="#fff" strokeWidth="8" fill="none" />
    </svg>
  ),
  CowSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#8B4513" />
      <circle cx="85" cy="80" r="12" fill="#fff" />
      <circle cx="115" cy="80" r="12" fill="#fff" />
      <path d="M70 100 Q100 110 130 100" stroke="#fff" strokeWidth="3" fill="none" />
    </svg>
  ),
  ParaSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FF6B35" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  OpenOcean: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#0066FF" />
      <path d="M60 100 Q100 70 140 100 Q100 130 60 100" fill="#fff" />
    </svg>
  ),
  KyberSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#31CB00" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
};

export default function DexTradeSection() {
  const { locale, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(ISC_CONTRACT);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const translations = {
    en: {
      title: 'Trade ISC',
      subtitle: 'Access ISC on 12+ Decentralized Exchanges',
      contractLabel: 'Contract Address',
      copy: 'Copy',
      copied: 'Copied!',
      viewAll: 'View All Exchanges',
      hideAll: 'Hide Exchanges',
      step1: 'Step 1: Visit any DEX',
      step2: 'Step 2: Connect your wallet',
      step3: 'Step 3: Paste ISC contract address',
      step4: 'Step 4: Trade ISC tokens',
    },
    zh: {
      title: '交易 ISC',
      subtitle: '在 12+ 个去中心化交易所交易 ISC',
      contractLabel: '合约地址',
      copy: '复制',
      copied: '已复制!',
      viewAll: '查看所有交易所',
      hideAll: '隐藏交易所',
      step1: '第 1 步：访问任何 DEX',
      step2: '第 2 步：连接您的钱包',
      step3: '第 3 步：粘贴 ISC 合约地址',
      step4: '第 4 步：交易 ISC 代币',
    },
    vi: {
      title: 'Giao dịch ISC',
      subtitle: 'Truy cập ISC trên 12+ Sàn giao dịch phi tập trung',
      contractLabel: 'Địa chỉ hợp đồng',
      copy: 'Sao chép',
      copied: 'Đã sao chép!',
      viewAll: 'Xem tất cả các sàn',
      hideAll: 'Ẩn các sàn',
      step1: 'Bước 1: Truy cập bất kỳ DEX nào',
      step2: 'Bước 2: Kết nối ví của bạn',
      step3: 'Bước 3: Dán địa chỉ hợp đồng ISC',
      step4: 'Bước 4: Giao dịch token ISC',
    },
  };

  const text = translations[locale as keyof typeof translations] || translations.en;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'oklch(0.92 0.03 220)' }}>
            {text.title}
          </h2>
          <p className="text-base sm:text-lg" style={{ color: 'oklch(0.65 0.08 220)' }}>
            {text.subtitle}
          </p>
        </motion.div>

        {/* Collapsible Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl border transition-all duration-500 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, oklch(0.14 0.02 250 / 0.8), oklch(0.12 0.02 250 / 0.6))',
              borderColor: 'oklch(0.55 0.18 255 / 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header - Always Visible */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-6 sm:px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'oklch(0.90 0.04 220)' }}>
                  {text.viewAll}
                </h3>
                <p className="text-sm" style={{ color: 'oklch(0.60 0.02 220)' }}>
                  {text.subtitle}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6" style={{ color: 'oklch(0.65 0.18 255)' }} />
              </motion.div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t"
                  style={{ borderColor: 'oklch(0.55 0.18 255 / 0.3)' }}
                >
                  <div className="px-6 sm:px-8 py-8">
                    {/* Contract Address */}
                    <div className="mb-8">
                      <label className="text-sm font-medium mb-2 block" style={{ color: 'oklch(0.65 0.08 220)' }}>
                        {text.contractLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        <code
                          className="flex-1 px-4 py-3 rounded-lg text-sm font-mono"
                          style={{
                            background: 'oklch(0.10 0.02 250)',
                            color: 'oklch(0.75 0.15 255)',
                          }}
                        >
                          {ISC_CONTRACT}
                        </code>
                        <button
                          onClick={handleCopyAddress}
                          className="px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
                          style={{
                            background: copiedAddress ? 'oklch(0.50 0.15 150)' : 'oklch(0.55 0.18 255)',
                            color: '#fff',
                          }}
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="w-4 h-4" />
                              {text.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              {text.copy}
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* DEX Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                      {DEX_PLATFORMS.map((dex, index) => {
                        const LogoComponent = DexLogos[dex.name];
                        return (
                          <motion.a
                            key={index}
                            href={dex.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl text-center transition-all hover:translate-y-[-2px]"
                            style={{
                              background: 'oklch(0.10 0.02 250)',
                              border: '1px solid oklch(0.55 0.18 255 / 0.2)',
                            }}
                          >
                            <div className="flex justify-center mb-3">
                              {LogoComponent && <LogoComponent />}
                            </div>
                            <h4 className="font-semibold text-sm mb-1" style={{ color: 'oklch(0.90 0.04 220)' }}>
                              {dex.name}
                            </h4>
                            <p className="text-xs" style={{ color: 'oklch(0.60 0.02 220)' }}>
                              {dex.description}
                            </p>
                          </motion.a>
                        );
                      })}
                    </div>

                    {/* How to Trade */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4" style={{ color: 'oklch(0.90 0.04 220)' }}>
                        How to Trade ISC
                      </h4>
                      <div className="grid sm:grid-cols-4 gap-4">
                        {[text.step1, text.step2, text.step3, text.step4].map((step, i) => (
                          <div key={i} className="text-center">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm"
                              style={{
                                background: 'oklch(0.55 0.18 255)',
                                color: '#fff',
                              }}
                            >
                              {i + 1}
                            </div>
                            <p className="text-xs" style={{ color: 'oklch(0.60 0.02 220)' }}>
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
