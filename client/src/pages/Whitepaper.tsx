/**
 * ISC Whitepaper Page
 * Displays whitepaper information and download link
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function Whitepaper() {
  const { locale, t } = useLanguage();

  const content = {
    en: {
      title: 'ISC Whitepaper',
      subtitle: 'Ice Snow Coin - AI Chain Gaming Ecosystem',
      description: 'Learn about the vision, technology, and roadmap of Ice Snow Coin.',
      downloadBtn: 'Download Whitepaper (v3.0)',
      comingSoon: 'Whitepaper Coming Soon',
      comingSoonDesc: 'The comprehensive whitepaper is being prepared and will be available shortly.',
    },
    zh: {
      title: 'ISC 白皮书',
      subtitle: '冰雪币 - AI 链游生态',
      description: '了解冰雪币的愿景、技术和路线图。',
      downloadBtn: '下载白皮书 (v3.0)',
      comingSoon: '白皮书即将上线',
      comingSoonDesc: '完整的白皮书正在准备中，敬请期待。',
    },
    vi: {
      title: 'Sách Trắng ISC',
      subtitle: 'Ice Snow Coin - Hệ sinh thái AI Chain Gaming',
      description: 'Tìm hiểu về tầm nhìn, công nghệ và lộ trình của Ice Snow Coin.',
      downloadBtn: 'Tải Sách Trắng (v3.0)',
      comingSoon: 'Sách Trắng Sắp Ra Mắt',
      comingSoonDesc: 'Sách trắng toàn diện đang được chuẩn bị và sẽ có sẵn sớm.',
    },
  };

  const content_t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation Spacer */}
      <div className="h-20" />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <FileText className="w-16 h-16 text-cyan-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {content_t.title}
        </h1>
        <p className="text-2xl text-blue-300 mb-8">{content_t.subtitle}</p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">{content_t.description}</p>

        {/* Coming Soon Card */}
        <div className="max-w-2xl mx-auto mb-12 p-8 rounded-lg border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">{content_t.comingSoon}</h2>
          <p className="text-gray-300 mb-6">{content_t.comingSoonDesc}</p>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 mx-auto"
            disabled
          >
            <Download className="w-5 h-5" />
            {content_t.downloadBtn}
          </Button>
        </div>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="p-6 rounded-lg border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Vision</h3>
            <p className="text-gray-300 text-sm">Decentralized AI gaming ecosystem</p>
          </div>
          <div className="p-6 rounded-lg border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Technology</h3>
            <p className="text-gray-300 text-sm">Built on BSC with smart contracts</p>
          </div>
          <div className="p-6 rounded-lg border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Community</h3>
            <p className="text-gray-300 text-sm">Governed by token holders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
