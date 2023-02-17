# vuepress-plugin-chunkload-redirect


Clientside apps remain in the browser memory after initial load which is great for performance but if a new build is deployed the JS page chunks _could_ change, resulting in errors when routing to a desired destination.

This plugin fixes that by transparently redirecting to the latest version of the application when a chunk is invalid so you get the best of serverside and clientside routing.

Compatible with Vuepress 1.x

## Usage

```
npm i -D vuepress-plugin-chunkload-redirect
```

### Setup

Add to `config.js` or `theme/index.js`

```
module.exports = {
  plugins: [
    'vuepress-plugin-chunkload-redirect',
  ]
}
```