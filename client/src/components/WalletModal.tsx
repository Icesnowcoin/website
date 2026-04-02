/*
 * Design: Quantum Ice — Glass morphism wallet connection modal
 * Supports MetaMask, Trust Wallet, WalletConnect
 */
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <defs><linearGradient id="mm1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E2761B" /><stop offset="100%" stopColor="#CD6116" /></linearGradient></defs>
        <rect width="40" height="40" rx="10" fill="#F5841F" opacity="0.15" />
        <path d="M30.4 8L21.2 14.8l1.7-6.4L30.4 8z" fill="#E2761B" />
        <path d="M9.6 8l9.1 6.9-1.6-6.5L9.6 8zm17.5 17.6l-2.4 3.7 5.2 1.4 1.5-5.1h-4.3zm-20.6 0l1.5 5.1 5.2-1.4-2.4-3.7H6.5z" fill="#E4761B" />
        <path d="M12.9 17.8l-1.5 2.2 5.2.2-.2-5.6-3.5 3.2zm14.2 0l-3.6-3.3-.1 5.7 5.2-.2-1.5-2.2zm-14.8 7.8l3.1-1.5-2.7-2.1-.4 3.6zm8.3-1.5l3.1 1.5-.4-3.6-2.7 2.1z" fill="#E4761B" />
      </svg>
    ),
    color: '#F5841F',
    detect: () => typeof window !== 'undefined' && (window as any).ethereum?.isMetaMask,
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="10" fill="#3375BB" opacity="0.15" />
        <path d="M20 10c3.5 2.5 7 3.5 10 3.5 0 8-3 14-10 17.5C13 27.5 10 21.5 10 13.5c3 0 6.5-1 10-3.5z" fill="none" stroke="#3375BB" strokeWidth="2" />
      </svg>
    ),
    color: '#3375BB',
    detect: () => typeof window !== 'undefined' && (window as any).ethereum?.isTrust,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="10" fill="#3B99FC" opacity="0.15" />
        <path d="M13.5 16.5c3.6-3.5 9.4-3.5 13 0l.4.4c.2.2.2.5 0 .6l-1.3 1.3c-.1.1-.2.1-.3 0l-.6-.6c-2.5-2.4-6.5-2.4-9 0l-.6.6c-.1.1-.2.1-.3 0l-1.3-1.3c-.2-.2-.2-.5 0-.6l.4-.4zm16 3l1.2 1.2c.2.2.2.5 0 .6l-5.2 5.1c-.2.2-.4.2-.6 0l-3.7-3.6c0-.1-.1-.1-.2 0l-3.7 3.6c-.2.2-.4.2-.6 0l-5.2-5.1c-.2-.2-.2-.5 0-.6l1.2-1.2c.2-.2.4-.2.6 0l3.7 3.6c0 .1.1.1.2 0l3.7-3.6c.2-.2.4-.2.6 0l3.7 3.6c0 .1.1.1.2 0l3.7-3.6c.1-.2.4-.2.5 0z" fill="#3B99FC" />
      </svg>
    ),
    color: '#3B99FC',
    detect: () => false,
  },
];

export default function WalletModal({ open, onClose }: WalletModalProps) {
  const { t } = useLanguage();

  const handleConnect = (walletId: string, walletName: string) => {
    toast.info(`${walletName} — ${t('wallet.comingSoon')}`, {
      description: t('wallet.comingSoonDesc'),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
          >
            <div className="glass-card rounded-2xl border-glow p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t('wallet.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-[oklch(0.75_0.12_220/0.1)] transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-5" style={{ fontFamily: 'var(--font-sub)' }}>
                {t('wallet.desc')}
              </p>

              {/* Wallet Options */}
              <div className="flex flex-col gap-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id, wallet.name)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[oklch(0.75_0.12_220/0.1)] hover:border-[oklch(0.75_0.12_220/0.3)] hover:bg-[oklch(0.75_0.12_220/0.05)] transition-all duration-300 group"
                  >
                    {wallet.icon}
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {wallet.name}
                      </div>
                      {wallet.detect() && (
                        <div className="text-xs text-ice-blue mt-0.5">Detected</div>
                      )}
                    </div>
                    <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: wallet.color }} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
