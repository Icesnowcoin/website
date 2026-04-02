/*
 * Design: Quantum Ice — Roadmap section
 * Vertical timeline with glowing nodes, four phases
 */
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, Rocket, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS } from '@/lib/assets';

export default function RoadmapSection() {
  const { t } = useLanguage();

  const phases = [
    {
      icon: <Sprout className="w-5 h-5" />,
      titleKey: 'roadmap.phase1.title',
      timeKey: 'roadmap.phase1.time',
      itemsKey: 'roadmap.phase1.items',
      color: 'oklch(0.82 0.16 195)',
      active: true,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      titleKey: 'roadmap.phase2.title',
      timeKey: 'roadmap.phase2.time',
      itemsKey: 'roadmap.phase2.items',
      color: 'oklch(0.75 0.12 220)',
      active: false,
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      titleKey: 'roadmap.phase3.title',
      timeKey: 'roadmap.phase3.time',
      itemsKey: 'roadmap.phase3.items',
      color: 'oklch(0.55 0.18 255)',
      active: false,
    },
    {
      icon: <Crown className="w-5 h-5" />,
      titleKey: 'roadmap.phase4.title',
      timeKey: 'roadmap.phase4.time',
      itemsKey: 'roadmap.phase4.items',
      color: 'oklch(0.65 0.14 230)',
      active: false,
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.roadmapBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.92 0.03 220)' }}>
            {t('roadmap.title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.65 0.08 220)' }}>
            {t('roadmap.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[oklch(0.82_0.16_195/0.5)] via-[oklch(0.75_0.12_220/0.3)] to-[oklch(0.55_0.18_255/0.1)]" />

          {phases.map((phase, i) => {
            const items = t(phase.itemsKey).split('|');
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-16 sm:pl-20 pb-12 last:pb-0"
              >
                {/* Node */}
                <div
                  className="absolute left-3 sm:left-5 w-7 h-7 rounded-full flex items-center justify-center border-2"
                  style={{
                    borderColor: phase.color,
                    backgroundColor: phase.active ? `color-mix(in oklch, ${phase.color}, transparent 70%)` : 'oklch(0.12 0.02 250)',
                    boxShadow: phase.active ? `0 0 15px ${phase.color}` : 'none',
                  }}
                >
                  <div style={{ color: phase.color }}>{phase.icon}</div>
                </div>

                {/* Card */}
                <div
                  className="glass-card rounded-xl p-5 sm:p-6 border transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ borderColor: `color-mix(in oklch, ${phase.color}, transparent 80%)` }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: phase.color }}
                    >
                      {t(phase.titleKey)}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: phase.color,
                        backgroundColor: `color-mix(in oklch, ${phase.color}, transparent 90%)`,
                      }}
                    >
                      {t(phase.timeKey)}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: phase.color, opacity: 0.6 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
