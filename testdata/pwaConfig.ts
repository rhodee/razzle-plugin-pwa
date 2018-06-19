import { IPWAConfig } from '../index';

export const pwaConfig: IPWAConfig = {
  clientsClaim: true,
  skipWaiting: true,
  swDest: 'sw.js'
};
