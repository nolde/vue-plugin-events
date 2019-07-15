Vue.js Events Plugin
====================

[![npm version](https://img.shields.io/npm/v/vue-plugin-events.svg)](https://www.npmjs.com/package/vue-plugin-events)
[![vue 2.x](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![build status](https://img.shields.io/circleci/build/gh/nolde/vue-plugin-events/master.svg)](https://circleci.com/gh/nolde/vue-plugin-events)
[![minzipped size](https://badgen.net/bundlephobia/minzip/vue-plugin-events)](https://bundlephobia.com/result?p=vue-plugin-events)
[![code style: standard + prettier](https://img.shields.io/badge/code%20style-standard%20%2B%20prettier-ff69b4.svg)](https://standardjs.com/)

> Simple global event bus for Vue.js applications with automatic subscription control. Zero dependencies.

----------------

- [Installation](#installation)
- [Setup](#setup)
    + [Bundler](#bundler-webpack-rollup)
    + [Browser](#browser)
- [Usage](#usage)
    + [Listening to Events](#listening-to-events)
    + [Emitting Events](#emitting-events)
    + [API (`$events`)](#api-events)
- [License](#license)

----------------

Installation
------------
```bash
npm install --save vue-plugin-events
```

Setup
-----
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
<script src="vue-plugin-events/dist/vue-plugin-events.umd.js"></script>

<!-- From CDN -->
<script src="https://cdn.jsdelivr.net/npm/vue-plugin-events"></script>
```

Usage
-----

### Listening to Events

The plugin will automatically subscribe a component to events defined within its body. That is achieved using a new section named `events`. When your component is destroyed, so are any listeners that have been automatically created.

The handlers follow a pattern similar to component [`watch`](https://vuejs.org/v2/api/#watch) section.

```js
// MyComponent.vue
export default {
  data: () => ({
    myValue: 'anything'
  }),
  methods: {
    doSomething (arg) { /*...*/ }
  },
  events: {

    // will execute method `doSomething` when event named `someEvent` is emitted
    someEvent: 'doSomething',

    // will fire when event named `someHandledEvent` is emitted
    someHandledEvent (v) {
      this.doSomething(v)
    },

    // will fire when event named `immediateEvent` is emitted, and as
    // soon as the component is loaded and this section is evaluated,
    // much like `immediate` option from watchers
    immediateEvent: {
      immediate: true,
      handler (v) {
        this.doSomething(v)
      }
    },

    // will fire when a `justOnceEvent` is fired, and then won't fire again;
    // may fire twice if combined with `immediate`
    justOnceEvent: {
      once: true,
      handler (v) {
        console.log('arg is', v)
      }
    }

  }
}
```

### Emitting Events

Every component will be inject with an instance of `$event`, which allows the developer to emit events into the application-wide event bus. Any components listening to the emitted event will be triggered. More details can be seen in the [API](#api-events) section below.

The methods exposed by `$event` below are basically the same as [normal event methods in a Vue component](https://vuejs.org/v2/api/#Instance-Methods-Events), but instead of having only the parent component as a listeners, any component can subscribe to any events.

```js
// AnyComponent.vue
export default {
  // ...
  methods: {
    onSomething () {
      this.$events.emit('someEvent', this.payload)
    }
  },
  // ...
}
```

### API (`$events`)

#### __`.emit`__
+ __Arguments__
    * `{string} eventName`
    * `[...args]`
+ __Usage__
    * Triggers an event on the event bus. Any additional arguments will be passed into the listener’s callback function.

#### __`.on`__
+ __Arguments__
    * `{string | Array<string>} event` (array only supported in Vue 2.2.0+)
    * `{Function} callback`
+ __Usage__
    * Listens for an event in the global event bus. Normally, it is easier to allow the plugin to control the subscription of events. However, if needed in a special case, you can still manually listen for an event; just keep in mind that **the plugin does not track manual subscriptions**, so you mjust emember to unsubscribe when the component is destroyed, of the handler is no longer needed. The callback will receive all the additional arguments passed into the event-triggering method.

#### __`.once`__
+ __Arguments__
    * `{string | Array<string>} event` (array only supported in Vue 2.2.0+)
    * `{Function} callback`
+ __Usage__
    * Listens for an event in the global event bus, but only once. The listener will be removed once it triggers for the first time.

#### __`.off`__
+ __Arguments__
    * `{string | Array<string>} event` (array only supported in Vue 2.2.2+)
    * `{Function} [callback]`
+ __Usage__
    * Removes a global event bus listener. Both event and callback are necessary, to avoid removing more listeners than intended.

License
-------
[ISC](http://opensource.org/licenses/ISC) © 2019 Ricardo Nolde
