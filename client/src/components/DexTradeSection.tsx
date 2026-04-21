/**
 * DEX Trade Section
 * Displays 16 decentralized exchange platforms where users can trade ISC
 */

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DexPlatform {
  name: string;
  url: string;
  logo: string;
  description: string;
}

const DEX_PLATFORMS: DexPlatform[] = [
  {
    name: 'PancakeSwap',
    url: 'https://pancakeswap.finance',
    logo: '🥞',
    description: 'Leading BSC DEX',
  },
  {
    name: 'Biswap',
    url: 'https://biswap.org',
    logo: '🔄',
    description: 'BSC Exchange',
  },
  {
    name: 'ApeSwap',
    url: 'https://apeswap.finance',
    logo: '🦍',
    description: 'Multi-chain DEX',
  },
  {
    name: 'MDEX',
    url: 'https://mdex.com',
    logo: '📊',
    description: 'Hybrid Exchange',
  },
  {
    name: 'BabySwap',
    url: 'https://babyswap.finance',
    logo: '👶',
    description: 'Community DEX',
  },
  {
    name: 'Nomiswap',
    url: 'https://nomiswap.io',
    logo: '🌊',
    description: 'Stable Swap',
  },
  {
    name: 'Thena',
    url: 'https://thena.fi',
    logo: '⚡',
    description: 'Optimized DEX',
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    logo: '🦄',
    description: 'Multi-chain DEX',
  },
  {
    name: 'SushiSwap',
    url: 'https://www.sushi.com',
    logo: '🍣',
    description: 'Community DEX',
  },
  {
    name: 'Curve',
    url: 'https://curve.fi',
    logo: '📈',
    description: 'Stablecoin DEX',
  },
  {
    name: 'CowSwap',
    url: 'https://cow.fi',
    logo: '🐄',
    description: 'Intent-based DEX',
  },
  {
    name: 'dYdX',
    url: 'https://dydx.exchange',
    logo: '📉',
    description: 'Trading Platform',
  },
  {
    name: '1inch',
    url: 'https://app.1inch.io',
    logo: '1️⃣',
    description: 'DEX Aggregator',
  },
  {
    name: 'ParaSwap',
    url: 'https://app.paraswap.io',
    logo: '🔀',
    description: 'DEX Aggregator',
  },
  {
    name: 'OpenOcean',
    url: 'https://openocean.finance',
    logo: '🌊',
    description: 'DEX Aggregator',
  },
  {
    name: 'KyberSwap',
    url: 'https://kyberswap.com',
    logo: '💎',
    description: 'Multi-chain DEX',
  },
];

const ISC_CONTRACT = '0x11229a3f976566FA8a3ba462C432122f3B8876f6';

export default function DexTradeSection() {
  const { t, locale } = useLanguage();

  const translations: Record<string, Record<string, string>> = {
    sectionTitle: {
      'zh': '在 DEX 上交易 ISC',
      'en': 'Trade ISC on DEX',
      'vi': 'Giao dịch ISC trên DEX',
    },
    sectionDesc: {
      'zh': '在多个去中心化交易所上交易 ISC。使用合约地址搜索并交易。',
      'en': 'Trade ISC on multiple decentralized exchanges. Search and trade using the contract address.',
      'vi': 'Giao dịch ISC trên nhiều sàn giao dịch phi tập trung. Tìm kiếm và giao dịch bằng địa chỉ hợp đồng.',
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
  };

  const sectionTitle = translations.sectionTitle[locale] || 'Trade ISC on DEX';
  const sectionDesc = translations.sectionDesc[locale] || 'Trade ISC on multiple decentralized exchanges.';
  const contractLabel = translations.contractLabel[locale] || 'Contract Address';
  const copyTooltip = translations.copyTooltip[locale] || 'Click to copy';

  const handleCopyContract = () => {
    navigator.clipboard.writeText(ISC_CONTRACT);
    const msg = locale === 'zh' ? '已复制到剪贴板' : locale === 'vi' ? 'Đã sao chép vào bộ nhớ tạm' : 'Copied to clipboard';
    alert(msg);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.02_250/0.3)] via-transparent to-[oklch(0.10_0.02_250/0.1)]" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.95 0.02 220)' }}
          >
            {sectionTitle}
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
          >
            {sectionDesc}
          </p>

          {/* Contract Address Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-6 inline-block"
          >
            <div className="p-4 rounded-lg border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.08)]">
              <div
                className="text-xs font-semibold text-ice-blue mb-2"
                style={{ fontFamily: 'var(--font-sub)' }}
              >
                {translations.contractLabel[locale] || 'Contract Address'}
              </div>
              <button
                onClick={handleCopyContract}
                title={copyTooltip}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.05)] hover:bg-[oklch(0.75_0.12_220/0.1)] transition-colors duration-300 cursor-pointer"
              >
                <span
                  className="text-sm font-mono text-electric-cyan"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {ISC_CONTRACT}
                </span>
                <ExternalLink className="w-4 h-4 text-ice-blue" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* DEX Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {DEX_PLATFORMS.map((dex, index) => (
            <motion.a
              key={dex.name}
              href={dex.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-4 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)] hover:bg-[oklch(0.75_0.12_220/0.1)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[oklch(0.75_0.12_220/0.2)] to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Logo */}
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {dex.logo}
                </div>

                {/* Name */}
                <h3
                  className="font-semibold text-sm text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {dex.name}
                </h3>

                {/* Description */}
                <p
                  className="text-xs text-muted-foreground mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {dex.description}
                </p>

                {/* Visit Button */}
                <div className="flex items-center gap-2 text-ice-blue text-xs font-medium group-hover:text-electric-cyan transition-colors duration-300">
                  <span>{locale === 'zh' ? '访问' : locale === 'vi' ? 'Truy cập' : 'Visit'}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 p-6 rounded-lg border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.08)]"
        >
          <h4
            className="font-semibold text-sm text-ice-blue mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {locale === 'zh' ? '如何交易 ISC' : locale === 'vi' ? 'Cách giao dịch ISC' : 'How to Trade ISC'}
          </h4>
          <ol
            className="space-y-2 text-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
          >
            <li>
              1. {locale === 'zh' ? '选择您喜欢的 DEX 平台' : locale === 'vi' ? 'Chọn nền tảng DEX yêu thích của bạn' : 'Choose your preferred DEX platform'}
            </li>
            <li>
              2. {locale === 'zh' ? '复制 ISC 合约地址或搜索 ISC' : locale === 'vi' ? 'Sao chép địa chỉ hợp đồng ISC hoặc tìm kiếm ISC' : 'Copy ISC contract address or search for ISC'}
            </li>
            <li>
              3. {locale === 'zh' ? '连接您的钱包' : locale === 'vi' ? 'Kết nối ví của bạn' : 'Connect your wallet'}
            </li>
            <li>
              4. {locale === 'zh' ? '输入交易金额并确认' : locale === 'vi' ? 'Nhập số tiền giao dịch và xác nhận' : 'Enter amount and confirm transaction'}
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
