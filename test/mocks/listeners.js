module.exports = {

  createNormal (eventName, defaultValue = 'immediate') {
    return {
      name: 'normal',
      render (h) {
        return h('div', this.$slots.default)
      },
      data () {
        return {
          result: null
        }
      },
      events: {
        [eventName] (v) {
          this.result = v || defaultValue
        }
      }
    }
  },

  createImmediate (eventName, defaultValue = 'immediate') {
    return {
      name: 'immediate',
      render (h) {
        return h('div', this.$slots.default)
      },
      data () {
        return {
          result: null
        }
      },
      events: {
        [eventName]: {
          immediate: true,
          handler (v) {
            this.result = v || defaultValue
          }
        }
      }
    }
  },

  createOnce (eventName, defaultValue = 'immediate') {
    return {
      name: 'once',
      render (h) {
        return h('div', this.$slots.default)
      },
      data () {
        return {
          result: null
        }
      },
      events: {
        [eventName]: {
          once: true,
          handler (v) {
            this.result = v || defaultValue
          }
        }
      }
    }
  }

}
