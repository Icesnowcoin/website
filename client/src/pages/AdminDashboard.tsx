import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, Users, Activity, Zap } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');

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

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this page.</CardDescription>
          </CardHeader>
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor website analytics and trading activity</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 mb-8">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              onClick={() => setDateRange(range)}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalVisits || 0}</div>
              <p className="text-xs text-muted-foreground">page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.uniqueVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">unique sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tradeSummary?.totalTrades || 0}</div>
              <p className="text-xs text-muted-foreground">transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Liquidity Pools</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{liquidityPools?.length || 0}</div>
              <p className="text-xs text-muted-foreground">active pools</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Page Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages</CardDescription>
            </CardHeader>
            <CardContent>
              {pageStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pageStats.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pageUrl" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Device Stats Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Visitor device types</CardDescription>
            </CardHeader>
            <CardContent>
              {deviceStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceStats}
                      dataKey="visits"
                      nameKey="deviceType"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {deviceStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Country Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Visitor geographic distribution</CardDescription>
            </CardHeader>
            <CardContent>
              {countryStats.length > 0 ? (
                <div className="space-y-4">
                  {countryStats.slice(0, 5).map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{country.country || 'Unknown'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(country.visits / Math.max(...countryStats.map(c => c.visits))) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{country.visits}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Trade Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Activity</CardTitle>
              <CardDescription>Transaction types</CardDescription>
            </CardHeader>
            <CardContent>
              {tradeStats.length > 0 ? (
                <div className="space-y-4">
                  {tradeStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{stat.tradeType}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{stat.count}</span>
                        <span className="text-sm text-muted-foreground">trades</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Traders */}
        <Card>
          <CardHeader>
            <CardTitle>Top Traders</CardTitle>
            <CardDescription>Most active traders by volume</CardDescription>
          </CardHeader>
          <CardContent>
            {topTraders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Trader Address</th>
                      <th className="text-right py-2 px-4">Trade Count</th>
                      <th className="text-right py-2 px-4">Total Volume (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTraders.map((trader, index) => (
                      <tr key={index} className="border-b hover:bg-secondary">
                        <td className="py-2 px-4 font-mono text-xs">
                          {trader.trader.slice(0, 6)}...{trader.trader.slice(-4)}
                        </td>
                        <td className="text-right py-2 px-4">{trader.tradeCount}</td>
                        <td className="text-right py-2 px-4">${Number(trader.totalVolume).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
