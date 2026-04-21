/*
 * Design: Quantum Ice — Community section
 * Showcase community features and benefits
 */
import { motion } from 'framer-motion';
import { Users, MessageSquare, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CommunitySection() {
  const { t } = useLanguage();

  const communityFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t('community.feature1') || '全球社区',
      desc: t('community.feature1Desc') || '连接全球 ISC 爱好者',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: t('community.feature2') || '实时讨论',
      desc: t('community.feature2Desc') || '参与项目讨论和决策',
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: t('community.feature3') || '独家福利',
      desc: t('community.feature3Desc') || '获取社区专属奖励',
    },
  ];

  return (
    <section id="community" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ice-blue/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-ice-blue/10 rounded-full blur-3xl -translate-y-1/2" />
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
            {t('community.title')}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.70 0.02 220)' }}
          >
            {t('community.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {communityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-card rounded-xl p-6 text-center border-glow-hover transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'oklch(0.75 0.12 220 / 0.1)' }}
              >
                <div style={{ color: 'oklch(0.75 0.12 220)' }}>{feature.icon}</div>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.88 0.03 220)' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
