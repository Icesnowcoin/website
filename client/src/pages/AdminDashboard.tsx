import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TraderDetailsTable } from '@/components/TraderDetailsTable';
import { Loader2, TrendingUp, Users, Activity, Zap, Lock, Globe } from 'lucide-react';
import { getLoginUrl } from '@/const';
import { LOCALE_NAMES } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { locale, setLocale, t } = useLanguage();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);

  // Calculate date range
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    start.setDate(start.getDate() - days);
    return { startDate: start, endDate: end };
  }, [dateRange]);

  // Fetch analytics data
  const analyticsQuery = trpc.admin.analytics.summary.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  const pageStatsQuery = trpc.admin.analytics.pageStats.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  const countryStatsQuery = trpc.admin.analytics.countryStats.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  const deviceStatsQuery = trpc.admin.analytics.deviceStats.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  // Fetch trade data
  const tradeStatsQuery = trpc.admin.trades.stats.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  const tradeSummaryQuery = trpc.admin.trades.summary.useQuery(
    { startDate, endDate },
    { enabled: !!user && user.role === 'admin' }
  );

  const topTradersQuery = trpc.admin.trades.topTraders.useQuery(
    { startDate, endDate, limit: 10 },
    { enabled: !!user && user.role === 'admin' }
  );

  // Fetch liquidity pool data
  const liquidityPoolsQuery = trpc.admin.liquidityPools.list.useQuery(
    undefined,
    { enabled: !!user && user.role === 'admin' }
  );

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              {t('admin.loginRequired')}
            </CardTitle>
            <CardDescription>{t('admin.loginDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.location.href = getLoginUrl()}>
              {t('admin.loginButton')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              {t('admin.accessDenied')}
            </CardTitle>
            <CardDescription>{t('admin.accessDeniedDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t('admin.adminOnly')}
            </p>
            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              {t('admin.goBack')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const analytics = analyticsQuery.data;
  const pageStats = pageStatsQuery.data || [];
  const countryStats = countryStatsQuery.data || [];
  const deviceStats = deviceStatsQuery.data || [];
  const tradeStats = tradeStatsQuery.data || [];
  const tradeSummary = tradeSummaryQuery.data;
  const topTraders = topTradersQuery.data || [];
  const liquidityPools = liquidityPoolsQuery.data || [];

  const isLoading = analyticsQuery.isLoading || pageStatsQuery.isLoading || 
                   countryStatsQuery.isLoading || deviceStatsQuery.isLoading ||
                   tradeStatsQuery.isLoading || tradeSummaryQuery.isLoading ||
                   topTradersQuery.isLoading || liquidityPoolsQuery.isLoading;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
            <p className="text-muted-foreground mt-1">{t('admin.subtitle')}</p>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(Object.keys(LOCALE_NAMES) as Locale[]).map((lang) => (
                <Button
                  key={lang}
                  variant={locale === lang ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLocale(lang)}
                  className="min-w-16"
                >
                  {LOCALE_NAMES[lang]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            onClick={() => setDateRange('7d')}
          >
            {t('admin.last7Days')}
          </Button>
          <Button
            variant={dateRange === '30d' ? 'default' : 'outline'}
            onClick={() => setDateRange('30d')}
          >
            {t('admin.last30Days')}
          </Button>
          <Button
            variant={dateRange === '90d' ? 'default' : 'outline'}
            onClick={() => setDateRange('90d')}
          >
            {t('admin.last90Days')}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t('admin.totalVisits')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalVisits || 0}</div>
                  <p className="text-xs text-muted-foreground">{t('admin.pageViews')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t('admin.uniqueVisitors')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.uniqueVisitors || 0}</div>
                  <p className="text-xs text-muted-foreground">{t('admin.uniqueSessions')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    {t('admin.totalTrades')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tradeSummary?.totalTrades || 0}</div>
                  <p className="text-xs text-muted-foreground">{t('admin.transactions')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {t('admin.liquidityPools')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liquidityPools.length}</div>
                  <p className="text-xs text-muted-foreground">{t('admin.activePools')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.topPages')}</CardTitle>
                  <CardDescription>{t('admin.mostVisitedPages')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={pageStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="page" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.deviceDistribution')}</CardTitle>
                  <CardDescription>{t('admin.visitorDeviceTypes')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceStats}
                        dataKey="count"
                        nameKey="device"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {deviceStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0ea5e9', '#06b6d4', '#f59e0b'][index % 3]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Countries */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.topCountries')}</CardTitle>
                  <CardDescription>{t('admin.visitorGeographic')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {countryStats.map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stat.country}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-500"
                              style={{
                                width: `${(stat.visits / Math.max(...countryStats.map(s => s.visits))) * 100}%`
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8 text-right">{stat.visits}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trade Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.tradeActivity')}</CardTitle>
                  <CardDescription>{t('admin.transactionTypes')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tradeStats.map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {stat.tradeType === 'swap' && t('admin.swap')}
                          {stat.tradeType === 'add_liquidity' && t('admin.addLiquidity')}
                          {stat.tradeType === 'remove_liquidity' && t('admin.removeLiquidity')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{stat.count} {t('admin.trades')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Traders */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.topTraders')}</CardTitle>
                <CardDescription>{t('admin.mostActiveTradersVolume')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-semibold">{t('admin.traderAddress')}</th>
                        <th className="text-right py-2 px-4 font-semibold">{t('admin.tradeCount')}</th>
                        <th className="text-right py-2 px-4 font-semibold">{t('admin.totalVolume')}</th>
                        <th className="text-center py-2 px-4 font-semibold">{t('admin.action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTraders.length > 0 ? (
                        topTraders.map((trader, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/50">
                            <td className="py-2 px-4 font-mono text-xs">{trader.trader}</td>
                            <td className="text-right py-2 px-4">{trader.tradeCount}</td>
                            <td className="text-right py-2 px-4">${parseFloat(trader.totalVolume).toFixed(2)}</td>
                            <td className="text-center py-2 px-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedTrader(trader.trader)}
                              >
                                {t('admin.viewDetails')}
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-muted-foreground">
                            {t('admin.noData')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Trader Details */}
            {selectedTrader && (
              <div className="mt-8">
                <TraderDetailsTable traderAddress={selectedTrader} />
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTrader(null)}
                  >
                    {t('admin.closeDetails') || 'Close Details'}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
