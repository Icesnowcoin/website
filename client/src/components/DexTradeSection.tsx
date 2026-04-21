/**
 * DEX Trade Section
 * Collapsible card showing 16 decentralized exchange platforms where users can trade ISC
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DexPlatform {
  name: string;
  url: string;
  logo: React.ReactNode;
  description: string;
}

// SVG Logo Components
const PancakeSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#FFB800"/>
    <path d="M100 40 C120 50 130 70 130 90 C130 110 120 130 100 140 C80 130 70 110 70 90 C70 70 80 50 100 40" fill="#1D1D1D"/>
    <circle cx="85" cy="85" r="8" fill="#FFB800"/>
    <circle cx="115" cy="85" r="8" fill="#FFB800"/>
  </svg>
);

const BiswapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#00D4FF"/>
    <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="white" opacity="0.3"/>
    <path d="M100 70 L130 100 L100 130 L70 100 Z" fill="white"/>
  </svg>
);

const ApeSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#FFB800"/>
    <circle cx="85" cy="80" r="20" fill="#8B4513"/>
    <circle cx="115" cy="80" r="20" fill="#8B4513"/>
    <path d="M80 110 Q100 130 120 110" stroke="#8B4513" strokeWidth="4" fill="none"/>
  </svg>
);

const MDEXLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#00D084"/>
    <path d="M100 50 L150 75 L150 125 L100 150 L50 125 L50 75 Z" fill="white"/>
  </svg>
);

const BabySwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#FF69B4"/>
    <circle cx="100" cy="100" r="60" fill="white" opacity="0.2"/>
    <circle cx="85" cy="85" r="12" fill="white"/>
    <circle cx="115" cy="85" r="12" fill="white"/>
    <path d="M80 110 Q100 125 120 110" stroke="white" strokeWidth="3" fill="none"/>
  </svg>
);

const NomiswapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#1E90FF"/>
    <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="white"/>
    <circle cx="100" cy="100" r="30" fill="#1E90FF"/>
  </svg>
);

const ThenaLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#00CED1"/>
    <path d="M100 60 L130 85 L115 100 L130 115 L100 140 L70 115 L85 100 L70 85 Z" fill="white"/>
  </svg>
);

const UniswapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#FF007A"/>
    <path d="M100 50 L140 100 L120 140 L80 140 L60 100 Z" fill="white"/>
  </svg>
);

const SushiSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#FA52A0"/>
    <circle cx="100" cy="100" r="70" fill="white" opacity="0.1"/>
    <path d="M100 60 L130 90 L130 130 L100 150 L70 130 L70 90 Z" fill="white"/>
  </svg>
);

const CurveLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#1E90FF"/>
    <path d="M60 140 Q100 60 140 140" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
  </svg>
);

const CowSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#8B4513"/>
    <circle cx="85" cy="80" r="18" fill="white"/>
    <circle cx="115" cy="80" r="18" fill="white"/>
    <path d="M75 100 L125 100" stroke="white" strokeWidth="4"/>
    <path d="M80 120 Q100 135 120 120" stroke="white" strokeWidth="4" fill="none"/>
  </svg>
);

const DYdXLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#6B5B95"/>
    <path d="M70 70 L130 130 M130 70 L70 130" stroke="white" strokeWidth="12" strokeLinecap="round"/>
  </svg>
);

const OneInchLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#1E3A8A"/>
    <text x="100" y="120" fontSize="60" fontWeight="bold" fill="#FFD700" textAnchor="middle">1</text>
  </svg>
);

const ParaSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#0066FF"/>
    <path d="M100 60 L140 100 L100 140 L60 100 Z" fill="white"/>
    <path d="M100 80 L120 100 L100 120 L80 100 Z" fill="#0066FF"/>
  </svg>
);

const OpenOceanLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#0099FF"/>
    <path d="M100 60 Q130 80 130 110 Q130 140 100 150 Q70 140 70 110 Q70 80 100 60" fill="white" opacity="0.3"/>
    <path d="M100 75 Q120 90 120 110 Q120 130 100 140 Q80 130 80 110 Q80 90 100 75" fill="white"/>
  </svg>
);

const KyberSwapLogo = () => (
  <svg viewBox="0 0 200 200" className="w-12 h-12">
    <circle cx="100" cy="100" r="95" fill="#31CB9E"/>
    <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="white"/>
    <circle cx="100" cy="100" r="25" fill="#31CB9E"/>
  </svg>
);

const DEX_PLATFORMS: DexPlatform[] = [
  {
    name: 'PancakeSwap',
    url: 'https://pancakeswap.finance',
    logo: <PancakeSwapLogo />,
    description: 'Leading BSC DEX',
  },
  {
    name: 'Biswap',
    url: 'https://biswap.org',
    logo: <BiswapLogo />,
    description: 'BSC Exchange',
  },
  {
    name: 'ApeSwap',
    url: 'https://apeswap.finance',
    logo: <ApeSwapLogo />,
    description: 'Multi-chain DEX',
  },
  {
    name: 'MDEX',
    url: 'https://mdex.com',
    logo: <MDEXLogo />,
    description: 'Hybrid Exchange',
  },
  {
    name: 'BabySwap',
    url: 'https://babyswap.finance',
    logo: <BabySwapLogo />,
    description: 'Community DEX',
  },
  {
    name: 'Nomiswap',
    url: 'https://nomiswap.io',
    logo: <NomiswapLogo />,
    description: 'Stable Swap',
  },
  {
    name: 'Thena',
    url: 'https://thena.fi',
    logo: <ThenaLogo />,
    description: 'Optimized DEX',
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    logo: <UniswapLogo />,
    description: 'Multi-chain DEX',
  },
  {
    name: 'SushiSwap',
    url: 'https://www.sushi.com',
    logo: <SushiSwapLogo />,
    description: 'Community DEX',
  },
  {
    name: 'Curve',
    url: 'https://curve.fi',
    logo: <CurveLogo />,
    description: 'Stablecoin DEX',
  },
  {
    name: 'CowSwap',
    url: 'https://cow.fi',
    logo: <CowSwapLogo />,
    description: 'Intent-based DEX',
  },
  {
    name: 'dYdX',
    url: 'https://dydx.exchange',
    logo: <DYdXLogo />,
    description: 'Trading Platform',
  },
  {
    name: '1inch',
    url: 'https://app.1inch.io',
    logo: <OneInchLogo />,
    description: 'DEX Aggregator',
  },
  {
    name: 'ParaSwap',
    url: 'https://app.paraswap.io',
    logo: <ParaSwapLogo />,
    description: 'DEX Aggregator',
  },
  {
    name: 'OpenOcean',
    url: 'https://openocean.finance',
    logo: <OpenOceanLogo />,
    description: 'DEX Aggregator',
  },
  {
    name: 'KyberSwap',
    url: 'https://kyberswap.com',
    logo: <KyberSwapLogo />,
    description: 'Multi-chain DEX',
  },
];

const ISC_CONTRACT = '0x11229a3f976566FA8a3ba462C432122f3B8876f6';

export default function DexTradeSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { locale } = useLanguage();

  const translations: Record<string, Record<string, string>> = {
    sectionTitle: {
      'zh': '在 DEX 上交易 ISC',
      'en': 'Trade ISC on DEX',
      'vi': 'Giao dịch ISC trên DEX',
    },
    sectionDesc: {
      'zh': '在 16 个去中心化交易所上交易 ISC。使用合约地址搜索并交易。',
      'en': 'Trade ISC on 16 decentralized exchanges. Search and trade using the contract address.',
      'vi': 'Giao dịch ISC trên 16 sàn giao dịch phi tập trung. Tìm kiếm và giao dịch bằng địa chỉ hợp đồng.',
    },
    contractLabel: {
      'zh': '合约地址',
      'en': 'Contract Address',
      'vi': 'Địa chỉ Hợp đồng',
    },
    copyTooltip: {
      'zh': '点击复制',
      'en': 'Click to copy',
      'vi': 'Nhấp để sao chép',
    },
    expandButton: {
      'zh': '展开交易所列表',
      'en': 'View All Exchanges',
      'vi': 'Xem tất cả sàn giao dịch',
    },
    collapseButton: {
      'zh': '收起交易所列表',
      'en': 'Hide Exchanges',
      'vi': 'Ẩn sàn giao dịch',
    },
  };

  const sectionTitle = translations.sectionTitle[locale] || 'Trade ISC on DEX';
  const sectionDesc = translations.sectionDesc[locale] || 'Trade ISC on 16 decentralized exchanges.';
  const contractLabel = translations.contractLabel[locale] || 'Contract Address';
  const copyTooltip = translations.copyTooltip[locale] || 'Click to copy';
  const expandButton = translations.expandButton[locale] || 'View All Exchanges';
  const collapseButton = translations.collapseButton[locale] || 'Hide Exchanges';

  const handleCopyContract = () => {
    navigator.clipboard.writeText(ISC_CONTRACT);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {sectionDesc}
          </p>
        </motion.div>

        {/* Collapsible Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg overflow-hidden"
        >
          {/* Contract Address Section */}
          <div className="p-6 border-b border-cyan-500/20">
            <p className="text-gray-400 text-sm mb-2">{contractLabel}</p>
            <button
              onClick={handleCopyContract}
              className="w-full text-left p-3 bg-background/50 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-all group cursor-pointer"
              title={copyTooltip}
            >
              <code className="text-cyan-400 text-sm font-mono group-hover:text-cyan-300 transition-colors">
                {ISC_CONTRACT}
              </code>
            </button>
          </div>

          {/* Collapsible Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition-colors group"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {isExpanded ? collapseButton : expandButton}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {DEX_PLATFORMS.length} {locale === 'zh' ? '个交易所' : locale === 'vi' ? 'sàn giao dịch' : 'exchanges'}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-cyan-400" size={24} />
            </motion.div>
          </button>

          {/* Expandable DEX Grid */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-cyan-500/20 overflow-hidden"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {DEX_PLATFORMS.map((dex, index) => (
                    <motion.a
                      key={dex.name}
                      href={dex.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* Background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Logo */}
                        <div className="mb-3 flex justify-center">
                          <div className="p-2 bg-background/50 rounded-lg group-hover:bg-background transition-colors">
                            {dex.logo}
                          </div>
                        </div>

                        {/* Name */}
                        <h4 className="text-sm font-semibold text-white text-center mb-1 group-hover:text-cyan-300 transition-colors">
                          {dex.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-gray-400 text-center mb-3">
                          {dex.description}
                        </p>

                        {/* Visit Link */}
                        <div className="flex items-center justify-center gap-1 text-cyan-400 group-hover:text-cyan-300 transition-colors text-xs">
                          <span>Visit</span>
                          <ExternalLink size={12} />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
