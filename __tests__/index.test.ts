import modify from '../index';
import { manifestConfig } from '../testdata/manifestConfig';
import { pwaConfig } from '../testdata/pwaConfig';

/*tslint:disable-next-line:no-var-requires no-submodule-imports*/
const createConfig = require('razzle/config/createConfig');

describe('razzle-plugin-pwa', () => {
  describe('with pwa', () => {
    it('has sane defaults provided for PWA provided', () => {
      const pluginFunc = modify({ pwaConfig });
      const config = createConfig('web', 'dev', {
        plugins: [{ func: pluginFunc, options: { useBabel: false } }]
      });
      const p = config.plugins[config.plugins.length - 1];

      expect(Object.getOwnPropertyNames(p)).toEqual(
        expect.arrayContaining(['config'])
      );
    });
  });

  describe('with offline', () => {
    it('appends the plugin when a manifest for offline provided', () => {
      const pluginFunc = modify({ manifestConfig });
      const config = createConfig('web', 'dev', {
        plugins: [{ func: pluginFunc, options: { useBabel: false } }]
      });
      const p = config.plugins[config.plugins.length - 1];

      expect(p.options).toEqual(expect.objectContaining(manifestConfig));
    });
  });

  describe('with both', () => {
    it('appends the plugins for web manifest and service worker', () => {
      const pluginFunc = modify({ manifestConfig, pwaConfig });
      const config = createConfig('web', 'dev', {
        plugins: [{ func: pluginFunc, options: { useBabel: false } }]
      });
      const mp = config.plugins[config.plugins.length - 2];
      const pwap = config.plugins[config.plugins.length - 1];

      expect(mp.options).toEqual(expect.objectContaining(manifestConfig));
      expect(Object.getOwnPropertyNames(pwap)).toEqual(
        expect.arrayContaining(['config'])
      );
    });
  });
});
