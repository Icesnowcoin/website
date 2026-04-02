/*
 * Design: Quantum Ice — Footer with links and compliance info
 */
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS, LINKS } from '@/lib/assets';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('nav.whitepaper'), href: LINKS.whitepaper, external: true },
    { label: t('nav.game'), href: LINKS.game, external: true },
    { label: t('nav.community'), href: LINKS.community, external: true },
    { label: t('nav.trade') + ' (PancakeSwap)', href: LINKS.pancakeswap, external: true },
  ];

  const resources = [
    { label: 'BSCScan', href: LINKS.bscscan, external: true },
    { label: 'X / Twitter', href: LINKS.twitter, external: true },
  ];

  return (
    <footer className="relative border-t border-[oklch(0.75_0.12_220/0.1)]">
      <div className="container mx-auto py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={ASSETS.logo} alt="ISC" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-base tracking-wide" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.85 0.05 220)' }}>
                ICE SNOW COIN
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.55 0.02 220)' }}>
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.80 0.04 220)' }}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm flex items-center gap-1 hover:text-ice-blue transition-colors"
                    style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.55 0.02 220)' }}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3 opacity-40" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.80 0.04 220)' }}>
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2.5">
              {resources.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm flex items-center gap-1 hover:text-ice-blue transition-colors"
                    style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.55 0.02 220)' }}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3 opacity-40" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.80 0.04 220)' }}>
              {t('footer.legal')}
            </h4>
            <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.45 0.02 220)' }}>
              {t('footer.compliance')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[oklch(0.75_0.12_220/0.08)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.40 0.02 220)' }}>
              &copy; {new Date().getFullYear()} Ice Snow Coin. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-ice-blue transition-colors"
                style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.02 220)' }}
              >
                @IceSnowCoin
              </a>
              <a
                href={LINKS.bscscan}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-ice-blue transition-colors"
                style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.45 0.02 220)' }}
              >
                BSCScan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
