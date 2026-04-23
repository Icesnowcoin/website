/*
 * Design: Quantum Ice — Security Badge Bar
 * Horizontal badge buttons below Hero section
 */
import { motion } from 'framer-motion';
import { Lock, Vote, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Suppress motion.a DOM warning
motion.a = motion.div as any;

interface Badge {
  icon: React.ReactNode;
  label: string;
  link: string;
  tooltip: string;
}

export default function SecurityBadgeBar() {
  const { t } = useLanguage();

  const badges: Badge[] = [
    {
      icon: <Lock className="w-5 h-5" />,
      label: 'LP Locked 4 Years',
      link: 'https://app.uncx.network/lockers/manage/lockers-v3?service=edit&wallet=0xf946A6521D201F2C757562Add139E5635e2a80b3&chain=56',
      tooltip: '70,684,800 ISC + USDT locked on UNCX Network until 2030',
    },
    {
      icon: <Vote className="w-5 h-5" />,
      label: 'DAO Governance',
      link: 'https://snapshot.org/#/icesnowcoin.eth',
      tooltip: 'Community-driven decisions via Snapshot',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'team@icesnowcoin.com',
      link: 'mailto:team@icesnowcoin.com',
      tooltip: 'Official business inquiries',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <a
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 hover:border-ice-blue"
                style={{
                  backgroundColor: 'rgba(0, 212, 255, 0.1)',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  color: '#00d4ff',
                }}
                title={badge.tooltip}
              >
              {/* Icon */}
              <div className="flex-shrink-0">{badge.icon}</div>

              {/* Label */}
              <span
                className="text-sm font-medium whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sub)' }}
              >
                {badge.label}
              </span>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                }}
              />

              {/* Tooltip on hover */}
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[oklch(0.10_0.02_250)] border border-[oklch(0.75_0.12_220/0.3)] text-xs text-ice-blue whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {badge.tooltip}
                {/* Arrow */}
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent"
                  style={{ borderTopColor: 'rgba(0, 212, 255, 0.3)' }}
                />
              </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
