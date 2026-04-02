// ISC Official Website - Internationalization System
// Supports: Chinese (zh), English (en), Vietnamese (vi)

export type Locale = 'zh' | 'en' | 'vi';

export const LOCALE_NAMES: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  vi: 'Tiếng Việt',
};

export const translations: Record<Locale, Record<string, string>> = {
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.whitepaper': '白皮书',
    'nav.game': '游戏',
    'nav.tokenomics': '代币经济学',
    'nav.roadmap': '路线图',
    'nav.community': '社区',
    'nav.connectWallet': '连接钱包',
    'nav.trade': '交易 ISC',

    // Hero
    'hero.subtitle': '连接虚拟与现实的 AI 链游生态帝国',
    'hero.description': '基于 BSC 链的多场景支付代币，融合 DeFi、GameFi 与现实连接，由 AI 驱动的下一代区块链游戏生态系统',
    'hero.presale': '预售即将开启',
    'hero.presaleDate': '2026年4月20日 - 4月30日',
    'hero.buyNow': '参与预售',
    'hero.learnMore': '了解更多',
    'hero.totalSupply': '总供应量',
    'hero.presalePrice': '预售价格',
    'hero.chain': '区块链',

    // About
    'about.title': '关于 ISC',
    'about.subtitle': '自然法则遇见数字革命',
    'about.desc1': 'Ice Snow Coin (ISC) 是一个革命性的区块链项目，致力于构建连接虚拟世界与现实世界的 AI 链游生态帝国。',
    'about.desc2': '通过融合人工智能、区块链技术和游戏产业，ISC 创造了一个全新的数字经济生态系统，让每一位参与者都能在虚拟与现实之间自由穿梭。',
    'about.feature1.title': '多场景支付',
    'about.feature1.desc': 'DEX交易、链游结算、NFT生态治理，一币通行',
    'about.feature2.title': 'AI 游戏生态',
    'about.feature2.desc': 'AI驱动的高互动性链游产品，重新定义游戏体验',
    'about.feature3.title': '现实连接',
    'about.feature3.desc': '链游资产与现实资产价值兑换，打破虚实壁垒',

    // Tokenomics
    'tokenomics.title': '代币经济学',
    'tokenomics.subtitle': '精心设计的通证经济模型',
    'tokenomics.totalSupply': '总供应量',
    'tokenomics.noInflation': '永不增发',
    'tokenomics.team': '团队持有',
    'tokenomics.teamDesc': '研发、运营、社区建立',
    'tokenomics.market': '市场投放',
    'tokenomics.marketDesc': '4年线性释放',
    'tokenomics.presale': '预售份额',
    'tokenomics.presaleDesc': '含在市场投放中',
    'tokenomics.presalePrice': '预售价格',
    'tokenomics.hardCap': '硬顶',
    'tokenomics.softCap': '软顶',
    'tokenomics.contract': '合约地址',
    'tokenomics.audit': '审计机构',

    // Ecosystem
    'ecosystem.title': '生态系统',
    'ecosystem.subtitle': '三大核心场景，构建完整生态闭环',
    'ecosystem.defi.title': 'DeFi 金融',
    'ecosystem.defi.desc': '在 PancakeSwap、Uniswap 等主流 DEX 上交易，流动性挖矿 APY 20-50%，质押奖励持续释放',
    'ecosystem.gamefi.title': 'GameFi 链游',
    'ecosystem.gamefi.desc': 'AI 驱动的高互动性链游产品，NFT 资产交易，Play-to-Earn 模式让游戏创造真实价值',
    'ecosystem.real.title': '现实连接',
    'ecosystem.real.desc': '线下商家支付、数字身份认证、链游资产与现实资产价值兑换，真正打通虚拟与现实',

    // Roadmap
    'roadmap.title': '发展路线图',
    'roadmap.subtitle': '从种子到参天大树的战略规划',
    'roadmap.phase1.title': '种子期',
    'roadmap.phase1.time': '0-12 个月',
    'roadmap.phase1.items': '市值达到100万美金|首款AI链游Demo发布|社区建设与品牌推广|完成安全审计',
    'roadmap.phase2.title': '成长期',
    'roadmap.phase2.time': '12-18 个月',
    'roadmap.phase2.items': '新加坡办事处成立|上线头部交易所|AI链游正式版上线|全球社区扩展',
    'roadmap.phase3.title': '扩张期',
    'roadmap.phase3.time': '18-36 个月',
    'roadmap.phase3.items': '3-5款AI链游上线|全球社区治理体系|跨链桥接部署|线下商家支付网络',
    'roadmap.phase4.title': '成熟期',
    'roadmap.phase4.time': '36-60 个月',
    'roadmap.phase4.items': '百亿市值目标|行业龙头地位|完整生态闭环|全球化运营体系',

    // Video
    'video.title': '社区招募',
    'video.subtitle': '加入 ISC 社区，共建 AI 链游生态帝国',
    'video.joinCommunity': '加入社区',

    // Footer
    'footer.description': 'Ice Snow Coin — 连接虚拟与现实的 AI 链游生态帝国',
    'footer.quickLinks': '快捷链接',
    'footer.resources': '资源',
    'footer.legal': '合规信息',
    'footer.compliance': '新加坡注册公司 | KYC/AML 三层验证 | 第三方资金托管 | 季度审计报告',
    'footer.rights': '版权所有',

    // Wallet
    'wallet.title': '连接钱包',
    'wallet.desc': '选择您的钱包进行连接',
    'wallet.metamask': 'MetaMask',
    'wallet.trustwallet': 'Trust Wallet',
    'wallet.walletconnect': 'WalletConnect',
  },

  en: {
    // Nav
    'nav.home': 'Home',
    'nav.whitepaper': 'Whitepaper',
    'nav.game': 'Game',
    'nav.tokenomics': 'Tokenomics',
    'nav.roadmap': 'Roadmap',
    'nav.community': 'Community',
    'nav.connectWallet': 'Connect Wallet',
    'nav.trade': 'Trade ISC',

    // Hero
    'hero.subtitle': 'AI Chain Gaming Ecosystem Connecting Virtual & Reality',
    'hero.description': 'A multi-scenario payment token on BSC, integrating DeFi, GameFi and real-world connections, powered by the next-generation AI blockchain gaming ecosystem',
    'hero.presale': 'Presale Coming Soon',
    'hero.presaleDate': 'April 20 - April 30, 2026',
    'hero.buyNow': 'Join Presale',
    'hero.learnMore': 'Learn More',
    'hero.totalSupply': 'Total Supply',
    'hero.presalePrice': 'Presale Price',
    'hero.chain': 'Blockchain',

    // About
    'about.title': 'About ISC',
    'about.subtitle': 'Where Natural Law Meets Digital Revolution',
    'about.desc1': 'Ice Snow Coin (ISC) is a revolutionary blockchain project dedicated to building an AI chain gaming ecosystem empire that connects virtual and real worlds.',
    'about.desc2': 'By integrating artificial intelligence, blockchain technology, and the gaming industry, ISC creates a brand-new digital economic ecosystem where every participant can freely traverse between virtual and reality.',
    'about.feature1.title': 'Multi-Scenario Payment',
    'about.feature1.desc': 'DEX trading, chain game settlement, NFT ecosystem governance — one token for all',
    'about.feature2.title': 'AI Gaming Ecosystem',
    'about.feature2.desc': 'AI-driven highly interactive chain games, redefining the gaming experience',
    'about.feature3.title': 'Real World Connection',
    'about.feature3.desc': 'Exchange chain game assets with real-world value, breaking virtual-reality barriers',

    // Tokenomics
    'tokenomics.title': 'Tokenomics',
    'tokenomics.subtitle': 'Carefully Designed Token Economic Model',
    'tokenomics.totalSupply': 'Total Supply',
    'tokenomics.noInflation': 'No Inflation',
    'tokenomics.team': 'Team Allocation',
    'tokenomics.teamDesc': 'R&D, Operations, Community Building',
    'tokenomics.market': 'Market Release',
    'tokenomics.marketDesc': '4-Year Linear Release',
    'tokenomics.presale': 'Presale Allocation',
    'tokenomics.presaleDesc': 'Included in Market Release',
    'tokenomics.presalePrice': 'Presale Price',
    'tokenomics.hardCap': 'Hard Cap',
    'tokenomics.softCap': 'Soft Cap',
    'tokenomics.contract': 'Contract Address',
    'tokenomics.audit': 'Audit Firms',

    // Ecosystem
    'ecosystem.title': 'Ecosystem',
    'ecosystem.subtitle': 'Three Core Scenarios Building a Complete Ecosystem',
    'ecosystem.defi.title': 'DeFi Finance',
    'ecosystem.defi.desc': 'Trade on PancakeSwap, Uniswap and major DEXs. Liquidity mining APY 20-50%, continuous staking rewards',
    'ecosystem.gamefi.title': 'GameFi',
    'ecosystem.gamefi.desc': 'AI-driven highly interactive chain games, NFT asset trading, Play-to-Earn model creating real value from gaming',
    'ecosystem.real.title': 'Real World Connection',
    'ecosystem.real.desc': 'Offline merchant payments, digital identity verification, chain game to real-world asset exchange',

    // Roadmap
    'roadmap.title': 'Roadmap',
    'roadmap.subtitle': 'Strategic Planning from Seed to Mighty Tree',
    'roadmap.phase1.title': 'Seed Phase',
    'roadmap.phase1.time': '0-12 Months',
    'roadmap.phase1.items': 'Market cap reaches $1M|First AI chain game demo|Community building & branding|Security audit completion',
    'roadmap.phase2.title': 'Growth Phase',
    'roadmap.phase2.time': '12-18 Months',
    'roadmap.phase2.items': 'Singapore office established|Listed on top exchanges|AI chain game official launch|Global community expansion',
    'roadmap.phase3.title': 'Expansion Phase',
    'roadmap.phase3.time': '18-36 Months',
    'roadmap.phase3.items': '3-5 AI chain games launched|Global community governance|Cross-chain bridge deployment|Offline payment network',
    'roadmap.phase4.title': 'Maturity Phase',
    'roadmap.phase4.time': '36-60 Months',
    'roadmap.phase4.items': '$10B market cap target|Industry leader position|Complete ecosystem loop|Global operations system',

    // Video
    'video.title': 'Community Recruitment',
    'video.subtitle': 'Join the ISC community and build the AI chain gaming ecosystem together',
    'video.joinCommunity': 'Join Community',

    // Footer
    'footer.description': 'Ice Snow Coin — AI Chain Gaming Ecosystem Connecting Virtual & Reality',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.legal': 'Compliance',
    'footer.compliance': 'Singapore Registered | KYC/AML 3-Tier Verification | Third-Party Custody | Quarterly Audit Reports',
    'footer.rights': 'All Rights Reserved',

    // Wallet
    'wallet.title': 'Connect Wallet',
    'wallet.desc': 'Choose your wallet to connect',
    'wallet.metamask': 'MetaMask',
    'wallet.trustwallet': 'Trust Wallet',
    'wallet.walletconnect': 'WalletConnect',
  },

  vi: {
    // Nav
    'nav.home': 'Trang chủ',
    'nav.whitepaper': 'Sách trắng',
    'nav.game': 'Trò chơi',
    'nav.tokenomics': 'Kinh tế Token',
    'nav.roadmap': 'Lộ trình',
    'nav.community': 'Cộng đồng',
    'nav.connectWallet': 'Kết nối ví',
    'nav.trade': 'Giao dịch ISC',

    // Hero
    'hero.subtitle': 'Hệ sinh thái trò chơi blockchain AI kết nối ảo và thực',
    'hero.description': 'Token thanh toán đa kịch bản trên BSC, tích hợp DeFi, GameFi và kết nối thế giới thực, được hỗ trợ bởi hệ sinh thái trò chơi blockchain AI thế hệ tiếp theo',
    'hero.presale': 'Bán trước sắp mở',
    'hero.presaleDate': '20/04/2026 - 30/04/2026',
    'hero.buyNow': 'Tham gia bán trước',
    'hero.learnMore': 'Tìm hiểu thêm',
    'hero.totalSupply': 'Tổng cung',
    'hero.presalePrice': 'Giá bán trước',
    'hero.chain': 'Blockchain',

    // About
    'about.title': 'Về ISC',
    'about.subtitle': 'Nơi quy luật tự nhiên gặp cách mạng số',
    'about.desc1': 'Ice Snow Coin (ISC) là một dự án blockchain cách mạng, cam kết xây dựng đế chế hệ sinh thái trò chơi chuỗi AI kết nối thế giới ảo và thực.',
    'about.desc2': 'Bằng cách tích hợp trí tuệ nhân tạo, công nghệ blockchain và ngành công nghiệp game, ISC tạo ra một hệ sinh thái kinh tế số hoàn toàn mới.',
    'about.feature1.title': 'Thanh toán đa kịch bản',
    'about.feature1.desc': 'Giao dịch DEX, thanh toán game chuỗi, quản trị hệ sinh thái NFT',
    'about.feature2.title': 'Hệ sinh thái game AI',
    'about.feature2.desc': 'Trò chơi chuỗi tương tác cao do AI điều khiển, định nghĩa lại trải nghiệm chơi game',
    'about.feature3.title': 'Kết nối thế giới thực',
    'about.feature3.desc': 'Trao đổi tài sản game chuỗi với giá trị thế giới thực, phá vỡ rào cản ảo-thực',

    // Tokenomics
    'tokenomics.title': 'Kinh tế Token',
    'tokenomics.subtitle': 'Mô hình kinh tế token được thiết kế cẩn thận',
    'tokenomics.totalSupply': 'Tổng cung',
    'tokenomics.noInflation': 'Không lạm phát',
    'tokenomics.team': 'Phân bổ đội ngũ',
    'tokenomics.teamDesc': 'R&D, Vận hành, Xây dựng cộng đồng',
    'tokenomics.market': 'Phát hành thị trường',
    'tokenomics.marketDesc': 'Phát hành tuyến tính 4 năm',
    'tokenomics.presale': 'Phân bổ bán trước',
    'tokenomics.presaleDesc': 'Bao gồm trong phát hành thị trường',
    'tokenomics.presalePrice': 'Giá bán trước',
    'tokenomics.hardCap': 'Giới hạn cứng',
    'tokenomics.softCap': 'Giới hạn mềm',
    'tokenomics.contract': 'Địa chỉ hợp đồng',
    'tokenomics.audit': 'Đơn vị kiểm toán',

    // Ecosystem
    'ecosystem.title': 'Hệ sinh thái',
    'ecosystem.subtitle': 'Ba kịch bản cốt lõi xây dựng hệ sinh thái hoàn chỉnh',
    'ecosystem.defi.title': 'Tài chính DeFi',
    'ecosystem.defi.desc': 'Giao dịch trên PancakeSwap, Uniswap và các DEX lớn. APY khai thác thanh khoản 20-50%',
    'ecosystem.gamefi.title': 'GameFi',
    'ecosystem.gamefi.desc': 'Trò chơi chuỗi tương tác cao do AI điều khiển, giao dịch tài sản NFT, mô hình Play-to-Earn',
    'ecosystem.real.title': 'Kết nối thế giới thực',
    'ecosystem.real.desc': 'Thanh toán thương nhân ngoại tuyến, xác minh danh tính số, trao đổi tài sản game-thực',

    // Roadmap
    'roadmap.title': 'Lộ trình',
    'roadmap.subtitle': 'Kế hoạch chiến lược từ hạt giống đến cây đại thụ',
    'roadmap.phase1.title': 'Giai đoạn hạt giống',
    'roadmap.phase1.time': '0-12 Tháng',
    'roadmap.phase1.items': 'Vốn hóa đạt $1M|Demo game AI chuỗi đầu tiên|Xây dựng cộng đồng & thương hiệu|Hoàn thành kiểm toán bảo mật',
    'roadmap.phase2.title': 'Giai đoạn tăng trưởng',
    'roadmap.phase2.time': '12-18 Tháng',
    'roadmap.phase2.items': 'Thành lập văn phòng Singapore|Niêm yết sàn giao dịch hàng đầu|Ra mắt chính thức game AI chuỗi|Mở rộng cộng đồng toàn cầu',
    'roadmap.phase3.title': 'Giai đoạn mở rộng',
    'roadmap.phase3.time': '18-36 Tháng',
    'roadmap.phase3.items': 'Ra mắt 3-5 game AI chuỗi|Quản trị cộng đồng toàn cầu|Triển khai cầu nối xuyên chuỗi|Mạng thanh toán ngoại tuyến',
    'roadmap.phase4.title': 'Giai đoạn trưởng thành',
    'roadmap.phase4.time': '36-60 Tháng',
    'roadmap.phase4.items': 'Mục tiêu vốn hóa $10B|Vị thế dẫn đầu ngành|Hệ sinh thái hoàn chỉnh|Hệ thống vận hành toàn cầu',

    // Video
    'video.title': 'Tuyển dụng cộng đồng',
    'video.subtitle': 'Tham gia cộng đồng ISC và cùng xây dựng hệ sinh thái trò chơi chuỗi AI',
    'video.joinCommunity': 'Tham gia cộng đồng',

    // Footer
    'footer.description': 'Ice Snow Coin — Hệ sinh thái trò chơi chuỗi AI kết nối ảo và thực',
    'footer.quickLinks': 'Liên kết nhanh',
    'footer.resources': 'Tài nguyên',
    'footer.legal': 'Tuân thủ',
    'footer.compliance': 'Đăng ký Singapore | Xác minh KYC/AML 3 tầng | Lưu ký bên thứ ba | Báo cáo kiểm toán hàng quý',
    'footer.rights': 'Bảo lưu mọi quyền',

    // Wallet
    'wallet.title': 'Kết nối ví',
    'wallet.desc': 'Chọn ví của bạn để kết nối',
    'wallet.metamask': 'MetaMask',
    'wallet.trustwallet': 'Trust Wallet',
    'wallet.walletconnect': 'WalletConnect',
  },
};
