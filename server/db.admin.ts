import { getDb } from "./db";
import { analytics, liquidityPools, trades, dailyStats } from "../drizzle/schema";
import { sql, eq, desc } from "drizzle-orm";

/**
 * Admin database queries for analytics and monitoring
 */

// Analytics queries
export async function getAnalyticsByDateRange(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    )
    .orderBy(desc(analytics.timestamp));
}

export async function getUniqueVisitors(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .selectDistinct({ sessionId: analytics.sessionId })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    );
}

export async function getPageStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      pageUrl: analytics.pageUrl,
      visits: sql<number>`COUNT(*) as visits`,
      avgDuration: sql<number>`AVG(${analytics.duration}) as avgDuration`,
    })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    )
    .groupBy(analytics.pageUrl)
    .orderBy(desc(sql`visits`));
}

export async function getCountryStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      country: analytics.country,
      visits: sql<number>`COUNT(*) as visits`,
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId}) as uniqueVisitors`,
    })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    )
    .groupBy(analytics.country)
    .orderBy(desc(sql`visits`));
}

export async function getDeviceStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      deviceType: analytics.deviceType,
      visits: sql<number>`COUNT(*) as visits`,
    })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    )
    .groupBy(analytics.deviceType);
}

// Liquidity Pool queries
export async function getAllLiquidityPools() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(liquidityPools).orderBy(desc(liquidityPools.lastUpdated));
}

export async function getLiquidityPoolById(poolId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(liquidityPools).where(eq(liquidityPools.id, poolId));
}

export async function getLiquidityPoolByAddress(poolAddress: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(liquidityPools).where(eq(liquidityPools.poolAddress, poolAddress));
}

// Trade queries
export async function getTradesByPoolId(poolId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(trades)
    .where(eq(trades.poolId, poolId))
    .orderBy(desc(trades.timestamp))
    .limit(limit);
}

export async function getTradesByDateRange(startDate: Date, endDate: Date, limit: number = 500) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(trades)
    .where(
      sql`${trades.timestamp} >= ${startDate} AND ${trades.timestamp} <= ${endDate}`
    )
    .orderBy(desc(trades.timestamp))
    .limit(limit);
}

export async function getTradeStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      tradeType: trades.tradeType,
      count: sql<number>`COUNT(*) as count`,
      totalVolume: sql<string>`SUM(CAST(${trades.usdValue} AS DECIMAL(20,2))) as totalVolume`,
    })
    .from(trades)
    .where(
      sql`${trades.timestamp} >= ${startDate} AND ${trades.timestamp} <= ${endDate}`
    )
    .groupBy(trades.tradeType);
}

export async function getTopTraders(startDate: Date, endDate: Date, limit: number = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      trader: trades.trader,
      tradeCount: sql<number>`COUNT(*) as tradeCount`,
      totalVolume: sql<string>`SUM(CAST(${trades.usdValue} AS DECIMAL(20,2))) as totalVolume`,
    })
    .from(trades)
    .where(
      sql`${trades.timestamp} >= ${startDate} AND ${trades.timestamp} <= ${endDate}`
    )
    .groupBy(trades.trader)
    .orderBy(desc(sql`totalVolume`))
    .limit(limit);
}

// Daily stats queries
export async function getDailyStatsByDateRange(startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(dailyStats)
    .where(
      sql`${dailyStats.date} >= ${startDate} AND ${dailyStats.date} <= ${endDate}`
    )
    .orderBy(dailyStats.date);
}

export async function getLatestDailyStat() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(dailyStats)
    .orderBy(desc(dailyStats.date))
    .limit(1);
}

// Summary queries
export async function getAnalyticsSummary(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const totalVisits = await db
    .select({ count: sql<number>`COUNT(*) as count` })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    );

  const uniqueVisitors = await db
    .selectDistinct({ sessionId: analytics.sessionId })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    );

  const avgSessionDuration = await db
    .select({ avg: sql<number>`AVG(${analytics.duration}) as avg` })
    .from(analytics)
    .where(
      sql`${analytics.timestamp} >= ${startDate} AND ${analytics.timestamp} <= ${endDate}`
    );

  return {
    totalVisits: totalVisits[0]?.count || 0,
    uniqueVisitors: uniqueVisitors.length,
    avgSessionDuration: avgSessionDuration[0]?.avg || 0,
  };
}

export async function getTradeSummary(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const totalTrades = await db
    .select({ count: sql<number>`COUNT(*) as count` })
    .from(trades)
    .where(
      sql`${trades.timestamp} >= ${startDate} AND ${trades.timestamp} <= ${endDate}`
    );

  const totalVolume = await db
    .select({ sum: sql<string>`SUM(CAST(${trades.usdValue} AS DECIMAL(20,2))) as sum` })
    .from(trades)
    .where(
      sql`${trades.timestamp} >= ${startDate} AND ${trades.timestamp} <= ${endDate}`
    );

  return {
    totalTrades: totalTrades[0]?.count || 0,
    totalVolume: totalVolume[0]?.sum || "0",
  };
}

// Get detailed trades for a specific trader
export async function getTraderDetails(traderAddress: string, limit: number = 100) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: trades.id,
      txHash: trades.txHash,
      tradeType: trades.tradeType,
      direction: trades.direction,
      iscAmount: trades.iscAmount,
      otherTokenAmount: trades.otherTokenAmount,
      otherTokenSymbol: trades.otherTokenSymbol,
      usdValue: trades.usdValue,
      timestamp: trades.timestamp,
      blockNumber: trades.blockNumber,
    })
    .from(trades)
    .where(eq(trades.trader, traderAddress))
    .orderBy(desc(trades.timestamp))
    .limit(limit);
}

// Get trader statistics
export async function getTraderStats(traderAddress: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const stats = await db
    .select({
      totalTrades: sql<number>`COUNT(*) as totalTrades`,
      totalVolume: sql<string>`SUM(CAST(${trades.usdValue} AS DECIMAL(20,2))) as totalVolume`,
      buyCount: sql<number>`SUM(CASE WHEN ${trades.direction} = 'buy' THEN 1 ELSE 0 END) as buyCount`,
      sellCount: sql<number>`SUM(CASE WHEN ${trades.direction} = 'sell' THEN 1 ELSE 0 END) as sellCount`,
      totalIscBought: sql<string>`SUM(CASE WHEN ${trades.direction} = 'buy' THEN CAST(${trades.iscAmount} AS DECIMAL(30,8)) ELSE 0 END) as totalIscBought`,
      totalIscSold: sql<string>`SUM(CASE WHEN ${trades.direction} = 'sell' THEN CAST(${trades.iscAmount} AS DECIMAL(30,8)) ELSE 0 END) as totalIscSold`,
    })
    .from(trades)
    .where(eq(trades.trader, traderAddress));
  
  return stats[0] || {
    totalTrades: 0,
    totalVolume: "0",
    buyCount: 0,
    sellCount: 0,
    totalIscBought: "0",
    totalIscSold: "0",
  };
}
