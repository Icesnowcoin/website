import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from './db';
import * as adminDb from './db.admin';
import { trades, liquidityPools } from '../drizzle/schema';

describe('Trader Details Queries', () => {
  let db: any;
  let testPoolId: number;
  let testTraderAddress = '0x' + 'a'.repeat(40);

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database not available for tests');
    }

    // Create test liquidity pool with unique address
    const uniquePoolAddr = '0x' + Math.random().toString(16).slice(2).padEnd(40, '0');
    const poolResult = await db.insert(liquidityPools).values({
      poolAddress: uniquePoolAddr,
      dexName: 'PancakeSwap',
      token0: '0x' + 'c'.repeat(40),
      token1: '0x' + 'd'.repeat(40),
      token0Symbol: 'ISC',
      token1Symbol: 'USDT',
      chainId: 56,
      liquidity: '1000000000000000000',
      volume24h: '500000',
      fees24h: '1000',
      apr: '25.5',
    });
    testPoolId = poolResult[0]?.id || 1;

    // Create test trades with direction and ISC amounts
    const uniqueTxHash1 = '0x' + Math.random().toString(16).slice(2).padEnd(64, '0');
    const uniqueTxHash2 = '0x' + Math.random().toString(16).slice(2).padEnd(64, '1');
    await db.insert(trades).values([
      {
        poolId: testPoolId,
        txHash: uniqueTxHash1,
        tradeType: 'swap',
        trader: testTraderAddress,
        token0Amount: '100000000000000000',
        token1Amount: '500000000000000000',
        usdValue: '50000',
        gasUsed: '100000',
        gasPrice: '5000000000',
        blockNumber: 12345,
        direction: 'buy',
        iscAmount: '100',
        otherTokenAmount: '500',
        otherTokenSymbol: 'USDT',
        timestamp: new Date(),
      },
      {
        poolId: testPoolId,
        txHash: uniqueTxHash2,
        tradeType: 'swap',
        trader: testTraderAddress,
        token0Amount: '50000000000000000',
        token1Amount: '250000000000000000',
        usdValue: '25000',
        gasUsed: '100000',
        gasPrice: '5000000000',
        blockNumber: 12346,
        direction: 'sell',
        iscAmount: '50',
        otherTokenAmount: '250',
        otherTokenSymbol: 'USDT',
        timestamp: new Date(),
      },
    ]);
  });

  describe('Trader Details', () => {
    it('should get trader details with buy/sell direction', async () => {
      const details = await adminDb.getTraderDetails(testTraderAddress, 100);

      expect(Array.isArray(details)).toBe(true);
      expect(details.length).toBeGreaterThanOrEqual(2);
      
      // Check for buy and sell trades
      const buyTrades = details.filter(t => t.direction === 'buy');
      const sellTrades = details.filter(t => t.direction === 'sell');
      
      expect(buyTrades.length).toBeGreaterThanOrEqual(1);
      expect(sellTrades.length).toBeGreaterThanOrEqual(1);
      
      // Check first trade has required fields
      if (details.length > 0) {
        expect(details[0]).toHaveProperty('direction');
        expect(details[0]).toHaveProperty('iscAmount');
        expect(details[0]).toHaveProperty('otherTokenAmount');
        expect(details[0]).toHaveProperty('otherTokenSymbol');
        expect(details[0]).toHaveProperty('usdValue');
        expect(details[0]).toHaveProperty('timestamp');
      }
    });

    it('should calculate trader statistics correctly', async () => {
      const stats = await adminDb.getTraderStats(testTraderAddress);

      expect(stats).toBeDefined();
      expect(stats).toHaveProperty('totalTrades');
      expect(stats).toHaveProperty('buyCount');
      expect(stats).toHaveProperty('sellCount');
      expect(stats).toHaveProperty('totalIscBought');
      expect(stats).toHaveProperty('totalIscSold');
      expect(stats).toHaveProperty('totalVolume');
      
      expect(stats.totalTrades).toBeGreaterThanOrEqual(2);
      expect(Number(stats.buyCount) || 0).toBeGreaterThanOrEqual(1);
      expect(Number(stats.sellCount) || 0).toBeGreaterThanOrEqual(1);
      expect(parseFloat(stats.totalIscBought)).toBeGreaterThan(0);
      expect(parseFloat(stats.totalIscSold)).toBeGreaterThan(0);
    });

    it('should return empty stats for non-existent trader', async () => {
      const stats = await adminDb.getTraderStats('0x' + '0'.repeat(40));

      expect(stats).toBeDefined();
      expect(stats.totalTrades).toBe(0);
      expect(Number(stats.buyCount) || 0).toBe(0);
      expect(Number(stats.sellCount) || 0).toBe(0);
      expect(stats.totalIscBought || '0').toBe('0');
      expect(stats.totalIscSold || '0').toBe('0');
    });

    it('should return empty array for trader with no trades', async () => {
      const details = await adminDb.getTraderDetails('0x' + '1'.repeat(40), 100);

      expect(Array.isArray(details)).toBe(true);
      expect(details.length).toBe(0);
    });
  });

  describe('Trade Statistics', () => {
    it('should get top traders', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const topTraders = await adminDb.getTopTraders(startDate, endDate, 10);

      expect(Array.isArray(topTraders)).toBe(true);
      if (topTraders.length > 0) {
        expect(topTraders[0]).toHaveProperty('trader');
        expect(topTraders[0]).toHaveProperty('tradeCount');
        expect(topTraders[0]).toHaveProperty('totalVolume');
      }
    });

    it('should get trade stats by type', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const stats = await adminDb.getTradeStats(startDate, endDate);

      expect(Array.isArray(stats)).toBe(true);
      if (stats.length > 0) {
        expect(stats[0]).toHaveProperty('tradeType');
        expect(stats[0]).toHaveProperty('count');
        expect(stats[0]).toHaveProperty('totalVolume');
      }
    });
  });
});
