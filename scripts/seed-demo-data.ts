import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { analytics, liquidityPools, trades, dailyStats } from '../drizzle/schema';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function seedDemoData() {
  try {
    // Create connection pool
    const pool = mysql.createPool(DATABASE_URL);
    const db = drizzle(pool);

    console.log('🌱 Starting demo data generation...');

    // Generate analytics data for the last 7 days
    const analyticsData = [];
    const pages = ['/', '/about', '/tokenomics', '/ecosystem', '/roadmap', '/community'];
    const countries = ['United States', 'China', 'Singapore', 'Japan', 'Germany', 'United Kingdom'];
    const devices = ['desktop', 'mobile', 'tablet'];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

      for (let j = 0; j < 50; j++) {
        analyticsData.push({
          sessionId: `session_${i}_${j}_${Math.random().toString(36).substr(2, 9)}`,
          userId: Math.random() > 0.7 ? Math.floor(Math.random() * 100) : null,
          pageUrl: pages[Math.floor(Math.random() * pages.length)],
          referrer: Math.random() > 0.6 ? 'google.com' : 'twitter.com',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ipAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          country: countries[Math.floor(Math.random() * countries.length)],
          city: 'New York',
          deviceType: devices[Math.floor(Math.random() * devices.length)] as 'desktop' | 'mobile' | 'tablet',
          duration: Math.floor(Math.random() * 600) + 30,
          timestamp: date,
        });
      }
    }

    console.log(`📊 Inserting ${analyticsData.length} analytics records...`);
    await db.insert(analytics).values(analyticsData);

    // Generate liquidity pool data
    const poolsData = [
      {
        poolAddress: '0x1234567890123456789012345678901234567890',
        dexName: 'PancakeSwap',
        token0: '0x0000000000000000000000000000000000000001',
        token1: '0x0000000000000000000000000000000000000002',
        token0Symbol: 'ISC',
        token1Symbol: 'USDT',
        chainId: 56,
        liquidity: '5000000000000000000000',
        volume24h: '2500000',
        fees24h: '7500',
        apr: '125.5',
      },
      {
        poolAddress: '0x2345678901234567890123456789012345678901',
        dexName: 'Uniswap',
        token0: '0x0000000000000000000000000000000000000001',
        token1: '0x0000000000000000000000000000000000000003',
        token0Symbol: 'ISC',
        token1Symbol: 'BUSD',
        chainId: 56,
        liquidity: '3500000000000000000000',
        volume24h: '1800000',
        fees24h: '5400',
        apr: '98.3',
      },
      {
        poolAddress: '0x3456789012345678901234567890123456789012',
        dexName: 'PancakeSwap',
        token0: '0x0000000000000000000000000000000000000002',
        token1: '0x0000000000000000000000000000000000000003',
        token0Symbol: 'USDT',
        token1Symbol: 'BUSD',
        chainId: 56,
        liquidity: '8000000000000000000000',
        volume24h: '4200000',
        fees24h: '12600',
        apr: '156.8',
      },
    ];

    console.log(`🏊 Inserting ${poolsData.length} liquidity pools...`);
    await db.insert(liquidityPools).values(poolsData);

    // Generate trade data
    const tradesData = [];
    const tradeTypes: Array<'swap' | 'add_liquidity' | 'remove_liquidity'> = ['swap', 'add_liquidity', 'remove_liquidity'];

    for (let i = 0; i < 150; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 7));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

      tradesData.push({
        poolId: Math.floor(Math.random() * 3) + 1,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        tradeType: tradeTypes[Math.floor(Math.random() * tradeTypes.length)],
        trader: `0x${Math.random().toString(16).substr(2, 40)}`,
        token0Amount: (Math.random() * 10000).toFixed(2),
        token1Amount: (Math.random() * 50000).toFixed(2),
        usdValue: (Math.random() * 100000).toFixed(2),
        gasUsed: '150000',
        gasPrice: '5000000000',
        blockNumber: Math.floor(Math.random() * 50000000) + 30000000,
        timestamp: date,
      });
    }

    console.log(`💱 Inserting ${tradesData.length} trade records...`);
    await db.insert(trades).values(tradesData);

    // Generate daily stats
    const dailyStatsData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      dailyStatsData.push({
        date: dateStr,
        totalVisits: Math.floor(Math.random() * 500) + 200,
        uniqueVisitors: Math.floor(Math.random() * 300) + 100,
        totalTrades: Math.floor(Math.random() * 50) + 10,
        totalVolume: (Math.random() * 500000).toFixed(2),
        totalLiquidity: (Math.random() * 20000000).toFixed(2),
        avgSessionDuration: Math.floor(Math.random() * 300) + 60,
        topCountries: JSON.stringify(['United States', 'China', 'Singapore']),
      });
    }

    console.log(`📅 Inserting ${dailyStatsData.length} daily stats records...`);
    await db.insert(dailyStats).values(dailyStatsData);

    console.log('✅ Demo data generation completed successfully!');
    console.log(`
📊 Generated Data Summary:
  - Analytics Records: ${analyticsData.length}
  - Liquidity Pools: ${poolsData.length}
  - Trades: ${tradesData.length}
  - Daily Stats: ${dailyStatsData.length}
    `);

    await pool.end();
  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
    process.exit(1);
  }
}

seedDemoData();
