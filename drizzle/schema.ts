import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Analytics table for tracking website visits and user interactions
 */
export const analytics = mysqlTable("analytics", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  userId: int("userId"),
  pageUrl: varchar("pageUrl", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  country: varchar("country", { length: 64 }),
  city: varchar("city", { length: 64 }),
  deviceType: mysqlEnum("deviceType", ["desktop", "mobile", "tablet"]).notNull(),
  duration: int("duration"), // in seconds
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

/**
 * Liquidity pools table for tracking DEX pools
 */
export const liquidityPools = mysqlTable("liquidity_pools", {
  id: int("id").autoincrement().primaryKey(),
  poolAddress: varchar("poolAddress", { length: 66 }).notNull().unique(),
  dexName: varchar("dexName", { length: 64 }).notNull(), // PancakeSwap, Uniswap, etc.
  token0: varchar("token0", { length: 66 }).notNull(),
  token1: varchar("token1", { length: 66 }).notNull(),
  token0Symbol: varchar("token0Symbol", { length: 20 }).notNull(),
  token1Symbol: varchar("token1Symbol", { length: 20 }).notNull(),
  chainId: int("chainId").notNull(), // 56 for BSC
  liquidity: text("liquidity"), // stored as string for big numbers
  volume24h: text("volume24h"),
  fees24h: text("fees24h"),
  apr: varchar("apr", { length: 20 }),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LiquidityPool = typeof liquidityPools.$inferSelect;
export type InsertLiquidityPool = typeof liquidityPools.$inferInsert;

/**
 * Trades table for tracking individual transactions
 */
export const trades = mysqlTable("trades", {
  id: int("id").autoincrement().primaryKey(),
  poolId: int("poolId").notNull(),
  txHash: varchar("txHash", { length: 66 }).notNull().unique(),
  tradeType: mysqlEnum("tradeType", ["swap", "add_liquidity", "remove_liquidity"]).notNull(),
  trader: varchar("trader", { length: 66 }).notNull(),
  token0Amount: text("token0Amount").notNull(),
  token1Amount: text("token1Amount").notNull(),
  usdValue: varchar("usdValue", { length: 30 }),
  gasUsed: text("gasUsed"),
  gasPrice: text("gasPrice"),
  blockNumber: int("blockNumber").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Trade = typeof trades.$inferSelect;
export type InsertTrade = typeof trades.$inferInsert;

/**
 * Daily statistics table for aggregated metrics
 */
export const dailyStats = mysqlTable("daily_stats", {
  id: int("id").autoincrement().primaryKey(),
  date: varchar("date", { length: 10 }).notNull().unique(), // YYYY-MM-DD
  totalVisits: int("totalVisits").default(0).notNull(),
  uniqueVisitors: int("uniqueVisitors").default(0).notNull(),
  totalTrades: int("totalTrades").default(0).notNull(),
  totalVolume: text("totalVolume"), // in USD
  totalLiquidity: text("totalLiquidity"), // in USD
  avgSessionDuration: int("avgSessionDuration"), // in seconds
  topCountries: text("topCountries"), // JSON array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyStat = typeof dailyStats.$inferSelect;
export type InsertDailyStat = typeof dailyStats.$inferInsert;
