/*
 * Design: Quantum Ice — Tokenomics section
 * Donut chart visualization, key metrics, contract info
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Shield, Lock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS, LINKS } from '@/lib/assets';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

function DonutChart() {
  // 60% team, 40% market (10% presale within market)
  const segments = [
    { percent: 60, color: 'oklch(0.55 0.18 255)', label: '60%' },
    { percent: 30, color: 'oklch(0.75 0.12 220)', label: '30%' },
    { percent: 10, color: 'oklch(0.82 0.16 195)', label: '10%' },
  ];

  const radius = 80;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-64 sm:h-64">
      {/* Background circle */}
      <circle cx="100" cy="100" r={radius} fill="none" stroke="oklch(0.18 0.02 250)" strokeWidth={strokeWidth} />
      {/* Segments */}
      {segments.map((seg, i) => {
        const dashLength = (seg.percent / 100) * circumference;
        const dashOffset = -offset;
        offset += dashLength;
        return (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
            style={{ filter: `drop-shadow(0 0 6px ${seg.color})` }}
          />
        );
      })}
      {/* Center text */}
      <text x="100" y="92" textAnchor="middle" fill="oklch(0.90 0.03 220)" fontSize="14" fontFamily="var(--font-heading)" fontWeight="700">
        202.6M
      </text>
      <text x="100" y="112" textAnchor="middle" fill="oklch(0.60 0.02 220)" fontSize="10" fontFamily="var(--font-mono)">
        ISC
      </text>
    </svg>
  );
}

export default function TokenomicsSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(LINKS.contract);
    setCopied(true);
    toast.success('Contract address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const allocations = [
    { color: 'oklch(0.55 0.18 255)', label: t('tokenomics.team'), percent: '60%', amount: '121,560,000', desc: t('tokenomics.teamDesc'), icon: <Lock className="w-4 h-4" /> },
    { color: 'oklch(0.75 0.12 220)', label: t('tokenomics.market'), percent: '30%', amount: '60,780,000', desc: t('tokenomics.marketDesc'), icon: <TrendingUp className="w-4 h-4" /> },
    { color: 'oklch(0.82 0.16 195)', label: t('tokenomics.presale'), percent: '10%', amount: '20,260,000', desc: t('tokenomics.presaleDesc'), icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <section id="tokenomics" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.tokenomicsBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.92 0.03 220)' }}>
            {t('tokenomics.title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.65 0.08 220)' }}>
            {t('tokenomics.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Chart + Allocations */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Donut Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <DonutChart />
          </motion.div>

          {/* Allocation Details */}
          <div className="flex flex-col gap-4">
            {allocations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card rounded-xl p-4 flex items-start gap-4 border-glow-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${item.color}, transparent 85%)` }}>
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.88 0.03 220)' }}>
                      {item.label}
                    </h4>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: item.color }}>
                      {item.percent}
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.55 0.02 220)' }}>
                    {item.amount} ISC
                  </p>
                  <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.55 0.02 220)' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <motion.div {...fadeInUp} className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { label: t('tokenomics.presalePrice'), value: '1 USDT = 2000 ISC' },
            { label: t('tokenomics.audit'), value: 'CertiK & OpenZeppelin' },
          ].map((metric, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-sub)' }}>{metric.label}</div>
              <div className="text-sm font-bold text-ice-blue" style={{ fontFamily: 'var(--font-mono)' }}>{metric.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Contract Address */}
        <motion.div {...fadeInUp} className="glass-card rounded-xl p-4 max-w-2xl mx-auto">
          <div className="text-xs text-muted-foreground mb-2 text-center" style={{ fontFamily: 'var(--font-sub)' }}>
            {t('tokenomics.contract')} (BSC - BEP20)
          </div>
          <div className="flex items-center gap-2 justify-center">
            <a
              href={LINKS.bscscan}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-ice-blue hover:text-electric-cyan transition-colors break-all"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {LINKS.contract}
            </a>
            <button
              onClick={copyContract}
              className="shrink-0 p-1.5 rounded-md hover:bg-[oklch(0.75_0.12_220/0.1)] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
