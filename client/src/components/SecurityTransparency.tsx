/*
 * Design: Quantum Ice — Security & Transparency Section
 * 2x2 grid of security cards with bottom banner
 */
import { motion } from 'framer-motion';
import { Shield, Flame, Lock, Hourglass, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SecurityCard {
  icon: React.ReactNode;
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

export default function SecurityTransparency() {
  const { t } = useLanguage();

  const cards: SecurityCard[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('security.card1.title'),
      content: t('security.card1.desc'),
      buttonText: t('security.card1.button'),
      buttonLink: 'https://bscscan.com/address/0xf74f38cb35255b85514c49255f0ea29a013cb618#code',
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: t('security.card2.title'),
      content: t('security.card2.desc'),
      buttonText: t('security.card2.button'),
      buttonLink: 'https://bscscan.com/address/0x11229a3f976566FA8a3ba462C432122f3B8876f6#readProxyContract',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: t('security.card3.title'),
      content: t('security.card3.desc'),
      buttonText: t('security.card3.button'),
      buttonLink: 'https://app.uncx.network/lockers/manage/lockers-v3?service=edit&wallet=0xf946A6521D201F2C757562Add139E5635e2a80b3&chain=56',
    },
    {
      icon: <Hourglass className="w-8 h-8" />,
      title: t('security.card4.title'),
      content: t('security.card4.desc'),
      buttonText: t('security.card4.button'),
      buttonLink: 'https://app.team.finance/vesting',
    },
  ];

  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ice-blue/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-ice-blue/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.90 0.03 220)' }}
          >
            {t('security.title')}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.70 0.02 220)' }}
          >
            {t('security.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Security Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group glass-card rounded-xl p-6 border-glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: 'oklch(0.75 0.12 220 / 0.1)' }}
              >
                <div style={{ color: 'oklch(0.75 0.12 220)' }}>{card.icon}</div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.88 0.03 220)' }}
              >
                {card.title}
              </h3>

              {/* Content */}
              <p
                className="text-sm mb-4"
                style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
              >
                {card.content}
              </p>

              {/* Button */}
              <a
                href={card.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ice-blue/10 text-ice-blue font-medium text-sm hover:bg-ice-blue/20 transition-all duration-300 border border-ice-blue/30 hover:border-ice-blue/50"
                style={{ fontFamily: 'var(--font-sub)' }}
              >
                {card.buttonText}
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative rounded-xl overflow-hidden p-6 sm:p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)',
          }}
        >
          <p
            className="text-base sm:text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('security.banner')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
