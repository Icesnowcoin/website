import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ISC - IceSnowCoin',
  projectId: 'ISC_OFFICIAL_WEBSITE',
  chains: [bsc],
  ssr: true,
});
