module.exports = function createEmitter (eventName, payload) {
  return {
    render (h) {
      return h('div')
    },
    data () {
      return { payload }
    },
    methods: {
      emitIt () {
        this.$events.emit(eventName, this.payload)
      }
    }
  }
}
