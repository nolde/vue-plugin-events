import VueEventBus from './VueEventBus'
import VueEventsMixin from './VueEventsMixin'

export default {
  install (Vue) {
    Vue.prototype.$events = new VueEventBus(Vue)
    Vue.mixin(VueEventsMixin)
  }
}
