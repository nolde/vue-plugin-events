export default class VueEventBus {
  constructor (Vue) {
    this._bus = new Vue()
  }

  emit (event, ...args) {
    this._bus.$emit(event, ...args)
  }

  on (event, callback) {
    this._bus.$on(event, callback)
  }

  once (event, callback) {
    this._bus.$once(event, callback)
  }

  off (event, callback) {
    if (event && callback) {
      this._bus.$off(event, callback)
    } else {
      console.warn(`[vue-plugin-events] "$events.off" can only be used with event and callback`)
    }
  }
}
