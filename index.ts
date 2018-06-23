import * as wp from 'webpack';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
import * as WorkboxPlugin from 'workbox-webpack-plugin';

const { InjectManifest } = WorkboxPlugin;
const { GenerateSW } = WorkboxPlugin;

export interface IPWAConfig {
  swSrc?: string | undefined;
  importWorkboxFrom?: 'cdn' | 'local' | 'disabled';
  chunks?: string[];
  include?: string[];
  exclude?: string[];
  excludeChunks?: string[] | string;
  precacheManifestFilename?: string;
  swDest: string;
  globDirectory?: string | undefined;
  clientsClaim?: boolean;
  skipWaiting?: boolean;
  globPatterns?: string[];
  globIgnores?: string[];
  maximumFileSizeToCacheInBytes?: number;
  dontCacheBustUrlsMatching?: RegExp | null;
  modifyUrlPrefix?: null | { [name: string]: string };
}

interface IApplication {
  platform: string;
  id?: string;
  url: string;
}

export interface IManifest {
  background_color: string;
  description: string;
  display: 'fullscreen' | 'standalone';
  filename: string;
  fingerprints?: boolean;
  icons?: WebpackPwaManifest.Icon[];
  includeDirectory?: boolean;
  ios?: boolean;
  name: string;
  orientation: 'portrait' | 'landscape';
  publicPath?: string;
  related_applications?: IApplication[];
  short_name: string;
  start_url: string;
  theme_color: string;
}

interface IModifyConfigOption {
  manifestConfig?: IManifest;
  pwaConfig?: IPWAConfig;
}

interface IModifyConfigTargetDevOptions {
  target: 'node' | 'web';
  dev: boolean;
}

interface IRazzleUserOptions {
  [name: string]: any;
}

type IRazzleModifyFunc = (
  baseConfig: wp.Configuration,
  { target, dev }: IModifyConfigTargetDevOptions,
  webpack: wp.Compiler,
  userOptions: IRazzleUserOptions
) => wp.Configuration;

const defaultWorkboxConfig = {
  importWorkboxFrom: 'local',
  swSrc: undefined
};

/**
 *
 * @param {IPWAConfig} pwaConfig - workbox-webpack-plugin options
 * @description The plugin configurations passed here will be used to create the service worker via webpack.
 * See here for details https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
 *
 */
const pwa = (pwaConfig: IPWAConfig): wp.Plugin => {
  const c = { ...defaultWorkboxConfig, ...pwaConfig };
  if (pwaConfig.swSrc) {
    return new InjectManifest(c);
  }
  delete c.swSrc;
  return new GenerateSW(c);
};

/**
 *
 * @param {IManifest} manifestConfig - webpack-pwa-manifest options
 * @description The plugin configurations passed here will be used to create the
 * a web manifest via webpack.
 * See here for details: https://github.com/arthurbergmz/webpack-pwa-manifest
 *
 */
const manifest = (manifestConfig: IManifest): wp.Plugin =>
  new WebpackPwaManifest(manifestConfig);

/**
 * @param {IModifyConfigOption} pluginConfig - configuration objects for webpack-pwa-manifest and/or workbox-webpack-plugin.
 * @description returns a function which closes over the pluginConfig and returns an object that can
 * be passed along to razzle.
 * @returns IRazzleModifyFunc
 */
export default (pluginConfig: IModifyConfigOption): IRazzleModifyFunc => {
  return (
    baseConfig: wp.Configuration,
    { target, dev }: IModifyConfigTargetDevOptions,
    webpack: wp.Compiler,
    userOptions = {}
  ) => {
    const config = { ...baseConfig };
    if (target === 'web') {
      const { manifestConfig, pwaConfig } = pluginConfig;
      if (manifestConfig) {
        config &&
          config.plugins &&
          config.plugins.push(manifest(manifestConfig));
      }
      if (pwaConfig) {
        config && config.plugins && config.plugins.push(pwa(pwaConfig));
      }
    }

    return config;
  };
};
