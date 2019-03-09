import VueEvents from './VueEvents'

// install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueEvents)
}

const version = '__VERSION__'
export { VueEvents, version }
export default VueEvents
