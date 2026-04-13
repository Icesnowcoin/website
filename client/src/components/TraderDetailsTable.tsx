import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface TraderDetailsTableProps {
  traderAddress: string;
}

export function TraderDetailsTable({ traderAddress }: TraderDetailsTableProps) {
  const { t } = useLanguage();
  
  const { data: details, isLoading: detailsLoading } = trpc.admin.trades.traderDetails.useQuery({
    traderAddress,
    limit: 100,
  });

  const { data: stats, isLoading: statsLoading } = trpc.admin.trades.traderStats.useQuery({
    traderAddress,
  });

  if (detailsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin mr-2" />
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trader Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{t("admin.traderStats") || "Trader Statistics"}</CardTitle>
          <CardDescription className="break-all">{traderAddress}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats?.totalTrades || 0}</div>
              <div className="text-sm text-muted-foreground">{t("admin.totalTrades") || "Total Trades"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{stats?.buyCount || 0}</div>
              <div className="text-sm text-muted-foreground">{t("admin.buyCount") || "Buy"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{stats?.sellCount || 0}</div>
              <div className="text-sm text-muted-foreground">{t("admin.sellCount") || "Sell"}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">${Number(stats?.totalVolume || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground">{t("admin.totalVolume") || "Total Volume"}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{Number(stats?.totalIscBought || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground">{t("admin.iscBought") || "ISC Bought"}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{Number(stats?.totalIscSold || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground">{t("admin.iscSold") || "ISC Sold"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Trades Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("admin.tradeDetails") || "Trade Details"}</CardTitle>
          <CardDescription>{t("admin.tradeDetailsDesc") || "All transactions for this trader"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">{t("admin.txHash") || "Tx Hash"}</th>
                  <th className="text-left py-2 px-2">{t("admin.type") || "Type"}</th>
                  <th className="text-left py-2 px-2">{t("admin.direction") || "Direction"}</th>
                  <th className="text-right py-2 px-2">{t("admin.iscAmount") || "ISC Amount"}</th>
                  <th className="text-left py-2 px-2">{t("admin.otherToken") || "Other Token"}</th>
                  <th className="text-right py-2 px-2">{t("admin.usdValue") || "USD Value"}</th>
                  <th className="text-left py-2 px-2">{t("admin.timestamp") || "Time"}</th>
                </tr>
              </thead>
              <tbody>
                {details && details.length > 0 ? (
                  details.map((trade) => (
                    <tr key={trade.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2 font-mono text-xs truncate max-w-[150px]">
                        <a 
                          href={`https://bscscan.com/tx/${trade.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {trade.txHash.slice(0, 10)}...
                        </a>
                      </td>
                      <td className="py-2 px-2">
                        <Badge variant="outline">
                          {trade.tradeType === "swap" ? "Swap" : 
                           trade.tradeType === "add_liquidity" ? "Add LP" : "Remove LP"}
                        </Badge>
                      </td>
                      <td className="py-2 px-2">
                        <Badge variant={trade.direction === "buy" ? "default" : "destructive"}>
                          {trade.direction === "buy" ? "🟢 BUY" : "🔴 SELL"}
                        </Badge>
                      </td>
                      <td className="py-2 px-2 text-right font-mono">
                        {Number(trade.iscAmount || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2">
                        {trade.otherTokenAmount} {trade.otherTokenSymbol}
                      </td>
                      <td className="py-2 px-2 text-right font-mono">
                        ${Number(trade.usdValue || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-xs">
                        {format(new Date(trade.timestamp), "MMM dd, HH:mm")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-muted-foreground">
                      {t("admin.noData") || "No trades found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
