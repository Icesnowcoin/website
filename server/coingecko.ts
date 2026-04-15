/**
 * CoinGecko API Integration
 * Fetches real-time cryptocurrency price data
 */

interface CoinGeckoPrice {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
  };
}

interface PriceData {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Map of token symbols to CoinGecko IDs
const TOKEN_MAP: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'XRP': 'ripple',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'USDT': 'tether',
  'USDC': 'usd-coin',
  'ISC': 'ice-snow-coin', // ISC token ID on CoinGecko (if available)
};

/**
 * Fetch current prices for multiple tokens
 */
export async function fetchPrices(symbols: string[]): Promise<PriceData[]> {
  try {
    const ids = symbols
      .map(s => TOKEN_MAP[s.toUpperCase()])
      .filter(Boolean)
      .join(',');

    if (!ids) return [];

    const url = `${COINGECKO_API_BASE}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('CoinGecko API error:', response.statusText);
      return [];
    }

    const data: CoinGeckoPrice = await response.json();
    const results: PriceData[] = [];

    for (const [symbol, coingeckoId] of Object.entries(TOKEN_MAP)) {
      if (!symbols.map(s => s.toUpperCase()).includes(symbol)) continue;
      
      const priceData = data[coingeckoId];
      if (priceData) {
        results.push({
          symbol,
          name: symbol,
          price: priceData.usd,
          marketCap: priceData.usd_market_cap || 0,
          change24h: priceData.usd_24h_change || 0,
          timestamp: new Date(),
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Failed to fetch prices from CoinGecko:', error);
    return [];
  }
}

/**
 * Fetch historical price data for a token
 */
export async function fetchHistoricalPrices(
  symbol: string,
  days: number = 30
): Promise<Array<{ date: string; price: number }>> {
  try {
    const coingeckoId = TOKEN_MAP[symbol.toUpperCase()];
    if (!coingeckoId) return [];

    const url = `${COINGECKO_API_BASE}/coins/${coingeckoId}/market_chart?vs_currency=usd&days=${days}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('CoinGecko API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    const prices: Array<{ date: string; price: number }> = [];

    if (data.prices && Array.isArray(data.prices)) {
      for (const [timestamp, price] of data.prices) {
        const date = new Date(timestamp);
        prices.push({
          date: date.toISOString().split('T')[0],
          price: Number(price.toFixed(2)),
        });
      }
    }

    return prices;
  } catch (error) {
    console.error('Failed to fetch historical prices:', error);
    return [];
  }
}

/**
 * Fetch top cryptocurrencies by market cap
 */
export async function fetchTopCryptos(limit: number = 10): Promise<PriceData[]> {
  try {
    const url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('CoinGecko API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    const results: PriceData[] = [];

    for (const coin of data) {
      results.push({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price || 0,
        marketCap: coin.market_cap || 0,
        change24h: coin.price_change_percentage_24h || 0,
        timestamp: new Date(),
      });
    }

    return results;
  } catch (error) {
    console.error('Failed to fetch top cryptos:', error);
    return [];
  }
}
