/**
 * Price data query helpers
 * Handles all database operations for token prices and price history
 */

import { getDb } from './db';
import { tokenPrices, priceHistory, InsertTokenPrice, InsertPriceHistory } from '../drizzle/schema';
import { eq, desc, gte, lte, inArray } from 'drizzle-orm';

/**
 * Get current price for a token
 */
export async function getTokenPrice(symbol: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(tokenPrices)
    .where(eq(tokenPrices.symbol, symbol.toUpperCase()))
    .limit(1);
  
  return result[0] || null;
}

/**
 * Get current prices for multiple tokens
 */
export async function getTokenPrices(symbols: string[]) {
  const db = await getDb();
  if (!db) return [];

  const upperSymbols = symbols.map(s => s.toUpperCase());
  return await db
    .select()
    .from(tokenPrices)
    .where(inArray(tokenPrices.symbol, upperSymbols));
}

/**
 * Get all token prices
 */
export async function getAllTokenPrices() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(tokenPrices)
    .orderBy(desc(tokenPrices.marketCap));
}

/**
 * Upsert token price (create or update)
 */
export async function upsertTokenPrice(data: InsertTokenPrice) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getTokenPrice(data.symbol);
  
  if (existing) {
    return await db
      .update(tokenPrices)
      .set({
        ...data,
        lastUpdated: new Date(),
      })
      .where(eq(tokenPrices.symbol, data.symbol.toUpperCase()));
  } else {
    return await db.insert(tokenPrices).values(data);
  }
}

/**
 * Get price history for a token (last N days)
 */
export async function getPriceHistory(symbol: string, days: number = 30) {
  const db = await getDb();
  if (!db) return [];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await db
    .select()
    .from(priceHistory)
    .where(
      (col: any) => {
        return eq(col.symbol, symbol.toUpperCase());
      }
    )
    .orderBy(desc(priceHistory.timestamp))
    .limit(days * 24); // Assuming hourly data
}

/**
 * Add price history record
 */
export async function addPriceHistory(data: InsertPriceHistory) {
  const db = await getDb();
  if (!db) return null;

  return await db.insert(priceHistory).values(data);
}

/**
 * Get price statistics for a token
 */
export async function getPriceStats(symbol: string) {
  const price = await getTokenPrice(symbol);
  const history = await getPriceHistory(symbol, 30);

  if (!price || history.length === 0) {
    return null;
  }

  const prices = history.map((h: any) => parseFloat(h.price.toString()));
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const avg = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;

  return {
    ...price,
    high30d: high,
    low30d: low,
    avg30d: avg,
    volatility: ((high - low) / avg) * 100,
  };
}

/**
 * Get top tokens by market cap
 */
export async function getTopTokens(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(tokenPrices)
    .orderBy(desc(tokenPrices.marketCap))
    .limit(limit);
}
