export default class VueEventBus {
  constructor (Vue) {
    this._bus = new Vue()
  }

  emit (name, ...args) {
    this._bus.$emit(name, ...args)
  }

  on (name, callback) {
    this._bus.$on(name, callback)
  }

  once (name, callback) {
    this._bus.$once(name, callback)
  }

  off (name, callback) {
    this._bus.$off(name, callback)
  }
}
