import modify from '../index';
import { manifestConfig } from '../testdata/manifestConfig';
import { pwaConfig } from '../testdata/pwaConfig';

/*tslint:disable-next-line:no-var-requires no-submodule-imports*/
const createConfig = require('razzle/config/createConfig');

describe('razzle-plugin-pwa', () => {
  describe('with pwa', () => {
    it('has sane defaults provided for PWA provided', () => {
      const pluginFunc = modify({ pwaConfig });
      const config = createConfig('node', 'dev', {
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
      const config = createConfig('node', 'dev', {
        plugins: [{ func: pluginFunc, options: { useBabel: false } }]
      });
      const p = config.plugins[config.plugins.length - 1];

      expect(Object.getOwnPropertyNames(p)).toEqual(
        expect.arrayContaining([
          '_generator',
          'assets',
          'htmlPlugin',
          'options'
        ])
      );
    });
  });

  describe('with both', () => {
    it('appends the plugins for web manifest and service worker', () => {
      const pluginFunc = modify({ manifestConfig, pwaConfig });
      const config = createConfig('node', 'dev', {
        plugins: [{ func: pluginFunc, options: { useBabel: false } }]
      });
      const mp = config.plugins[config.plugins.length - 2];
      const pwap = config.plugins[config.plugins.length - 1];

      expect(Object.getOwnPropertyNames(mp)).toEqual(
        expect.arrayContaining([
          '_generator',
          'assets',
          'htmlPlugin',
          'options'
        ])
      );
      expect(Object.getOwnPropertyNames(pwap)).toEqual(
        expect.arrayContaining(['config'])
      );
    });
  });
});
