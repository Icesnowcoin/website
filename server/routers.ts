import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { COOKIE_NAME } from "../shared/const";
import { TRPCError } from "@trpc/server";
import * as adminDb from "./db.admin";
import * as pricesDb from "./db.prices";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  admin: router({
    // Analytics routes
    analytics: router({
      summary: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getAnalyticsSummary(input.startDate, input.endDate);
        }),
      pageStats: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getPageStats(input.startDate, input.endDate);
        }),
      countryStats: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getCountryStats(input.startDate, input.endDate);
        }),
      deviceStats: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getDeviceStats(input.startDate, input.endDate);
        }),
    }),
    // Liquidity Pool routes
    liquidityPools: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        return adminDb.getAllLiquidityPools();
      }),
      getById: protectedProcedure
        .input(z.object({ poolId: z.number() }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getLiquidityPoolById(input.poolId);
        }),
    }),
    // Trade routes
    trades: router({
      summary: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getTradeSummary(input.startDate, input.endDate);
        }),
      stats: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getTradeStats(input.startDate, input.endDate);
        }),
      topTraders: protectedProcedure
        .input(z.object({
          startDate: z.date(),
          endDate: z.date(),
          limit: z.number().default(10),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getTopTraders(input.startDate, input.endDate, input.limit);
        }),
      traderDetails: protectedProcedure
        .input(z.object({
          traderAddress: z.string(),
          limit: z.number().default(100),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getTraderDetails(input.traderAddress, input.limit);
        }),
      traderStats: protectedProcedure
        .input(z.object({
          traderAddress: z.string(),
        }))
        .query(async ({ input, ctx }) => {
          if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
          return adminDb.getTraderStats(input.traderAddress);
        }),
    }),
  }),

  prices: router({
    // Get current price for a token from CoinGecko
    current: publicProcedure
      .input(z.object({
        symbol: z.string(),
      }))
      .query(async ({ input }) => {
        const { fetchPrices } = await import('./coingecko');
        const prices = await fetchPrices([input.symbol]);
        return prices.length > 0 ? prices[0] : null;
      }),

    // Get current prices for multiple tokens from CoinGecko
    multiple: publicProcedure
      .input(z.object({
        symbols: z.array(z.string()),
      }))
      .query(async ({ input }) => {
        const { fetchPrices } = await import('./coingecko');
        return fetchPrices(input.symbols);
      }),

    // Get all token prices
    all: publicProcedure
      .query(async () => {
        return pricesDb.getAllTokenPrices();
      }),

    // Get price history for a token
    history: publicProcedure
      .input(z.object({
        symbol: z.string(),
        days: z.number().default(30),
      }))
      .query(async ({ input }) => {
        return pricesDb.getPriceHistory(input.symbol, input.days);
      }),

    // Get price statistics
    stats: publicProcedure
      .input(z.object({
        symbol: z.string(),
      }))
      .query(async ({ input }) => {
        return pricesDb.getPriceStats(input.symbol);
      }),

    // Get top tokens by market cap from CoinGecko
    top: publicProcedure
      .input(z.object({
        limit: z.number().default(10),
      }))
      .query(async ({ input }) => {
        const { fetchTopCryptos } = await import('./coingecko');
        return fetchTopCryptos(input.limit);
      }),
  }),
});

export type AppRouter = typeof appRouter;
