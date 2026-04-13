import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from './db';
import * as adminDb from './db.admin';

describe('Admin Database Queries', () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database not available for tests');
    }
  });

  describe('Analytics Queries', () => {
    it('should get analytics summary for date range', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getAnalyticsSummary(startDate, endDate);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('totalVisits');
      expect(result).toHaveProperty('uniqueVisitors');
      expect(result).toHaveProperty('avgSessionDuration');
      expect(typeof result.totalVisits).toBe('number');
      expect(typeof result.uniqueVisitors).toBe('number');
    });

    it('should get page stats', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getPageStats(startDate, endDate);

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('pageUrl');
        expect(result[0]).toHaveProperty('visits');
      }
    });

    it('should get country stats', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getCountryStats(startDate, endDate);

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('country');
        expect(result[0]).toHaveProperty('visits');
      }
    });

    it('should get device stats', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getDeviceStats(startDate, endDate);

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('deviceType');
        expect(result[0]).toHaveProperty('visits');
      }
    });
  });

  describe('Liquidity Pool Queries', () => {
    it('should get all liquidity pools', async () => {
      const result = await adminDb.getAllLiquidityPools();

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('poolAddress');
        expect(result[0]).toHaveProperty('dexName');
      }
    });

    it('should handle non-existent pool gracefully', async () => {
      const result = await adminDb.getLiquidityPoolById(99999);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('Trade Queries', () => {
    it('should get trade summary for date range', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getTradeSummary(startDate, endDate);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('totalTrades');
      expect(result).toHaveProperty('totalVolume');
      expect(typeof result.totalTrades).toBe('number');
    });

    it('should get trade stats', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getTradeStats(startDate, endDate);

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('tradeType');
        expect(result[0]).toHaveProperty('count');
      }
    });

    it('should get top traders', async () => {
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date();

      const result = await adminDb.getTopTraders(startDate, endDate, 10);

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('trader');
        expect(result[0]).toHaveProperty('tradeCount');
        expect(result[0]).toHaveProperty('totalVolume');
      }
    });
  });

  describe('Daily Stats Queries', () => {
    it('should get latest daily stat', async () => {
      const result = await adminDb.getLatestDailyStat();

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('date');
        expect(result[0]).toHaveProperty('totalVisits');
      }
    });

    it('should get daily stats by date range', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';

      const result = await adminDb.getDailyStatsByDateRange(startDate, endDate);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle empty result sets gracefully', async () => {
      const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      const futureDateEnd = new Date(futureDate.getTime() + 24 * 60 * 60 * 1000);

      const result = await adminDb.getAnalyticsSummary(futureDate, futureDateEnd);

      expect(result).toBeDefined();
      expect(result.totalVisits).toBe(0);
      expect(result.uniqueVisitors).toBe(0);
    });
  });
});
