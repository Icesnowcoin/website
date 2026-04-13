import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TokenomicsTableSection() {
  const { t } = useLanguage();

  const tokenomicsData = [
    {
      category: t('tokenomics.team'),
      percent: '20%',
      amount: '40,520,000 ISC',
      usage: t('tokenomics.teamDesc'),
    },
    {
      category: t('tokenomics.operations'),
      percent: '30%',
      amount: '60,780,000 ISC',
      usage: t('tokenomics.operationsDesc'),
    },
    {
      category: t('tokenomics.market'),
      percent: '40%',
      amount: '81,040,000 ISC',
      usage: t('tokenomics.marketDesc'),
    },
    {
      category: t('tokenomics.apy'),
      percent: '10%',
      amount: '20,260,000 ISC',
      usage: t('tokenomics.apyDesc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="tokenomics" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ice-blue/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ice-blue/10 rounded-full blur-3xl" />
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
            {t('tokenomics.title')}
          </h2>
          <p
            className="text-lg sm:text-xl"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.70 0.02 220)' }}
          >
            {t('tokenomics.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="px-4 py-3 text-left font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.category') || '类别'}
                </th>
                <th
                  className="px-4 py-3 text-center font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.percentage') || '百分比'}
                </th>
                <th
                  className="px-4 py-3 text-center font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.amount') || '数量'}
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.usage') || '使用'}
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenomicsData.map((row, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'oklch(0.10 0.01 250)' : 'transparent',
                    borderBottom: '1px solid oklch(0.20 0.03 250)',
                  }}
                >
                  <td
                    className="px-4 py-4 font-semibold"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'oklch(0.85 0.03 220)',
                    }}
                  >
                    {row.category}
                  </td>
                  <td
                    className="px-4 py-4 text-center font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'oklch(0.75 0.12 220)',
                    }}
                  >
                    {row.percent}
                  </td>
                  <td
                    className="px-4 py-4 text-center"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'oklch(0.70 0.02 220)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {row.amount}
                  </td>
                  <td
                    className="px-4 py-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'oklch(0.65 0.02 220)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {row.usage}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Total Supply Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div
            className="glass-card rounded-xl p-6 text-center"
            style={{ borderColor: 'oklch(0.25 0.05 250)' }}
          >
            <p
              className="text-sm mb-2"
              style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
            >
              {t('tokenomics.totalSupply')}
            </p>
            <p
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-mono)', color: 'oklch(0.80 0.12 220)' }}
            >
              202.6M ISC
            </p>
          </div>

          <div
            className="glass-card rounded-xl p-6 text-center"
            style={{ borderColor: 'oklch(0.25 0.05 250)' }}
          >
            <p
              className="text-sm mb-2"
              style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.65 0.02 220)' }}
            >
              {t('tokenomics.noInflation')}
            </p>
            <p
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.80 0.12 195)' }}
            >
              ✓ {t('tokenomics.noInflation')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
