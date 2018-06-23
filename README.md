# razzle-plugin-pwa

[![CircleCI](https://circleci.com/gh/rhodee/razzle-plugin-pwa/tree/master.svg?style=shield)](https://circleci.com/gh/rhodee/razzle-plugin-pwa/tree/master)
![Razzle-status](https://david-dm.org/rhodee/razzle-plugin-pwa.svg?path=packages/razzle-plugin-pwa) [![npm version](https://badge.fury.io/js/razzle-plugin-pwa.svg)](https://badge.fury.io/js/razzle) [![Known Vulnerabilities](https://snyk.io/test/npm/razzle-plugin-pwa/badge.svg)](https://snyk.io/test/npm/razzle-plugin-pwa)

A [Razzle](https://github.com/jaredpalmer/razzle) 2.x [plugin](https://github.com/jaredpalmer/razzle/tree/master/packages) for generating configuraable progressive web applications and web application manifests.

## Usage

Example options for each plugin can be found inside of [testdata]('testdata'). Once you have your desired options, pass it to `modify` which will return a Razzle plugin compliant modify function. It just works.

```javascript
  // razzle.config.js
  const modifyBuilder = require('razzle-plugin-pwa').default

  const pwaConfig = {
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [{
        urlPattern: new RegExp('https://www.mysite.co'),
        handler: 'networkFirst'
    }]
  }

  const manifestConfig = {
    filename: 'manifest.json',
    name: 'Razzle App',
    short_name: 'Razzle',
    description: 'Another Razzle App',
    orientation: 'portrait',
    display: 'fullscreen',
    start_url: '.',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    related_applications: [],
    icons: [
      {
        'src': require.resolve(path.join(__dirname, 'public', 'favicon-16x16.png')),
        'sizes': '16x16',
        'type': 'image/png'
      },
      {
        'src': require.resolve(path.join(__dirname, 'public', 'favicon-32x32.png')),
        'sizes': '32x32',
        'type': 'image/png'
      },
      {
        'src': require.resolve(path.join(__dirname, 'public', 'favicon-144x144.png')),
        'sizes': '144x144',
        'type': 'image/png'
      },
      {
        'src': require.resolve(path.join(__dirname,'public', 'android-chrome-192x192.png')),
        'sizes': '192x192',
        'type': 'image/png'
      },
      {
          'src': require.resolve(path.join(__dirname, 'public', 'android-chrome-512x512.png')),
          'sizes': '512x512',
          'type': 'image/png'
      }
    ]
  }

  const modify = modifyBuilder({ pwaConfig, manifestConfig })

  module.exports = {
    plugins: [{ func: modify }]
  }
```

### Configuration options

All available configuration options are defined in their respective repositories:

- [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
- [webpack-pwa-manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)
