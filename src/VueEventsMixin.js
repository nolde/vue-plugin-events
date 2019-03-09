export default {
  data () {
    const events = this.$options.events
    if (events) {
      this._eventTracker = {}
    }
    return {}
  },
  created () {
    const events = this.$options.events
    if (events && this._eventTracker) {
      Object.keys(events).forEach(name => setupHandler(this, name, events[name]))
    }
  },
  beforeDestroy () {
    if (this._eventTracker) {
      Object.keys(this._eventTracker).forEach(name => {
        this.$events.off(name, this._eventTracker[name])
        this.$delete(this._eventTracker, name)
      })
    }
  }
}

// //////////////////////////////////////////////

function setupHandler (vm, name, handler) {
  switch (typeof handler) {
    case 'function': {
      setupFunction(vm, name, handler, 'on')
      break
    }
    case 'string': {
      setupString(vm, name, handler, 'on')
      break
    }
    case 'object': {
      setupObject(vm, name, handler)
      break
    }
    default: {
      console.warn(`[vue-plugin-events] Event handler "${event}" is invalid.`)
      break
    }
  }
}

function setupFunction (vm, name, handler, busMethod) {
  let callback = handler.bind(vm)
  vm._eventTracker[name] = callback
  vm.$events[busMethod](name, callback)
  return callback
}

function setupString (vm, name, handler, busMethod) {
  if (!vm[handler]) {
    console.warn(`[vue-plugin-events] Event handler "${event}" is set to inexistent method "${handler}".`)
    return null
  }
  let callback = vm[handler].bind(vm)
  vm._eventTracker[name] = callback
  vm.$events[busMethod](name, callback)
  return callback
}

function setupOptionsHandler (vm, name, handler, once) {
  switch (typeof handler) {
    case 'function': {
      return setupFunction(vm, name, handler, (once && 'once') || 'on')
    }
    case 'string': {
      return setupString(vm, name, handler, (once && 'once') || 'on')
    }
    default: {
      console.warn(`[vue-plugin-events] Event handler "${event}" is invalid.`)
      return null
    }
  }
}

function setupObject (vm, name, options) {
  if (options.handler) {
    let callback = setupOptionsHandler(vm, name, options.handler, Boolean(options.once))
    if (callback && options.immediate) {
      callback()
    }
    return callback
  }
  console.warn(`[vue-plugin-events] Event handler "${event}" is invalid (no handler found).`)
}
