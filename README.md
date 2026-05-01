# Ice Snow Coin (ISC) Official Website

A professional, fully decentralized AI Chain Gaming ecosystem website for Ice Snow Coin on BSC.

## Features

### Core Features
- ✅ **Fully Decentralized**: No admin privileges, community governed
- ✅ **Multi-Language Support**: Chinese, English, Vietnamese
- ✅ **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, sitemap.xml
- ✅ **Responsive Design**: Mobile-first, glassmorphism UI
- ✅ **Web3 Integration**: MetaMask wallet connection
- ✅ **Real-time Data**: Live staking information, tokenomics

### Pages
- **Home** (`/`): Main landing page with all sections
- **Whitepaper** (`/whitepaper`): Whitepaper information and download
- **Stake** (`/stake`): Redirect to APY staking interface
- **404**: Custom not found page

### Sections
1. **Hero Section**: Brand introduction with countdown timer
2. **Security Badge Bar**: LP lock, DAO governance, contact info
3. **Community Section**: Telegram, X/Twitter, Discord links
4. **About Section**: Project overview and features
5. **Tokenomics Section**: Token distribution and vesting
6. **Security & Transparency**: Smart contract verification, LP lock details
7. **Ecosystem Showcase**: GameFi, NFT, DeFi features
8. **How to Buy**: Step-by-step purchasing guide
9. **FAQ Section**: Frequently asked questions
10. **Security & Governance**: Audit information, DAO links
11. **Roadmap Section**: Project milestones and timeline
12. **Footer**: Links, contact info, risk disclaimer

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express 4 + tRPC 11
- **Database**: Drizzle ORM + MySQL/TiDB
- **Blockchain**: ethers.js v5 + MetaMask
- **Testing**: Vitest
- **Build**: Vite 7

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Database migration
pnpm db:push
```

## Environment Variables

```env
# Analytics
VITE_ANALYTICS_ENDPOINT=<endpoint>
VITE_ANALYTICS_WEBSITE_ID=<website_id>

# OAuth (Manus)
VITE_APP_ID=<app_id>
VITE_OAUTH_PORTAL_URL=<portal_url>
OAUTH_SERVER_URL=<server_url>

# Database
DATABASE_URL=<mysql_connection_string>

# Security
JWT_SECRET=<jwt_secret>
```

## Deployment

### Option 1: Manus WebDev (Recommended)
The website is built with Manus WebDev framework and automatically deployed to:
- **Primary Domain**: https://icesnowcoin.com
- **Alias Domains**: https://www.icesnowcoin.com, https://icesnowcoin-itwaq7bc.manus.space

### Option 2: VPS Deployment

```bash
# Build
pnpm build

# Copy to server
scp -r dist/* user@server:/var/www/html/

# Configure Nginx
location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

# Start server
pm2 start "pnpm dev" --name "isc-website"
```

## SEO Optimization

- ✅ Single H1 tag per page
- ✅ Optimized meta descriptions and keywords
- ✅ Open Graph and Twitter Card tags
- ✅ Canonical URLs
- ✅ Sitemap.xml and robots.txt
- ✅ Image alt attributes
- ✅ Structured data markup

## Security

- ✅ No admin privileges (ownership renounced)
- ✅ LP locked for 4 years on UNCX Network
- ✅ Smart contract audited by TechRate
- ✅ Team tokens vested for 24 months
- ✅ Community governance via Snapshot DAO

## Contract Information

- **Token**: ISC (Ice Snow Coin)
- **Contract**: 0x11229a3f976566FA8a3ba462C432122f3B8876f6
- **Network**: BSC Mainnet (Chain ID: 56)
- **Total Supply**: 202,600,000 ISC
- **Audit**: TechRate (April 2026)

## Links

- **Website**: https://icesnowcoin.com
- **GitHub**: https://github.com/Icesnowcoin
- **Twitter/X**: https://x.com/IceSnowCoin
- **Telegram**: https://t.me/IceSnowCoin
- **DAO Governance**: https://snapshot.org/spaces/icesnowcoin
- **BSCScan**: https://bscscan.com/token/0x11229a3f976566FA8a3ba462C432122f3B8876f6

## Contributing

This is a community-driven project. All contributions are welcome!

## License

MIT License - See LICENSE file for details

## Disclaimer

This website is for informational purposes only. Cryptocurrency investments carry risk. Please do your own research before investing.

---

**Last Updated**: May 1, 2026  
**Maintained by**: ISC Community
