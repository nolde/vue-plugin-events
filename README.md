# Vue.js Events Plugin

[![npm](https://img.shields.io/npm/v/vue-plugin-events.svg)](https://www.npmjs.com/package/vue-plugin-events) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Simple global event bus for Vue.js applications with automatic subscription control.

## Installation

```bash
npm install --save vue-plugin-events
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueEvents from 'vue-plugin-events'

Vue.use(VueEvents)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="vue-plugin-events/dist/vue-plugin-events.css"></link>
<script src="vue-plugin-events/dist/vue-plugin-events.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vue-plugin-events/dist/vue-plugin-events.css"></link>
<script src="https://unpkg.com/vue-plugin-events"></script>
```

## License

[ISC](http://opensource.org/licenses/ISC)
