import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { COOKIE_NAME } from "../shared/const";
import { TRPCError } from "@trpc/server";
import * as adminDb from "./db.admin";
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
    }),
  }),
});

export type AppRouter = typeof appRouter;
