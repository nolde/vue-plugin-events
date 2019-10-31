const test = require('tape')
const sinon = require('sinon')

const createLoader = require('../mocks/createLoader')
const { createNormal, createImmediate, createOnce } = require('../mocks/listeners')

// ////////////////////////////////////

import Vue from 'vue'
import VueEvents from '../../src'
import VueEventBus from '../../src/VueEventBus'

// ////////////////////////////////////

test(`plugin should add $events to Vue's prototype`, function (t) {
  t.is(typeof Vue.prototype.$events, 'undefined', 'prototype is empty')
  Vue.use(VueEvents)
  t.is(typeof Vue.prototype.$events, 'object', 'prototype is set')
  t.ok(Vue.prototype.$events instanceof VueEventBus, 'prototype is VueEventsBus')
  t.end()
})

test('plugin should support multiple different listeners', function (t) {
  const eventName = 'awesome'
  const payload00 = 'straight away'
  const components = [
    createNormal(eventName, payload00),
    createImmediate(eventName, payload00),
    createOnce(eventName, payload00)
  ]
  const spyEmit = sinon.spy(Vue.prototype.$events, 'emit')
  const spyOnce = sinon.spy(Vue.prototype.$events, 'once')
  const spyOn = sinon.spy(Vue.prototype.$events, 'on')
  const spyOff = sinon.spy(Vue.prototype.$events, 'off')
  let vm
  t.doesNotThrow(() => {
    vm = new Vue({ render: h => h(createLoader(components)) }).$mount()
  }, undefined, 'mount!')
  t.is(typeof vm.$events, 'object', 'instance $events is set')
  t.ok((vm.$events instanceof VueEventBus), 'instance $events is VueEventsBus')
  const refs = vm.$children[0].$refs
  t.is(refs.immediate.result, payload00, 'immediate triggered')
  t.is(refs.normal.result, null, 'normal not triggered')
  t.is(refs.once.result, null, 'once not triggered')
  const payload01 = 'this is really awesome'
  t.doesNotThrow(() => vm.$events.emit(eventName, payload01), undefined, 'emit!')
  t.is(refs.immediate.result, payload01, 'immediate triggered again')
  t.is(refs.normal.result, payload01, 'normal triggered')
  t.is(refs.once.result, payload01, 'once triggered')
  const payload02 = { aProp: 'a value' }
  t.doesNotThrow(() => vm.$events.emit(eventName, payload02), undefined, 'emit!')
  t.same(refs.immediate.result, payload02, 'immediate triggered yet again')
  t.same(refs.normal.result, payload02, 'normal triggered again')
  t.notSame(refs.once.result, payload02, 'once not triggered')
  t.is(refs.once.result, payload01, 'once still has old value')
  t.doesNotThrow(() => vm.$destroy(), undefined, 'destroy!')
  t.doesNotThrow(() => vm.$events.emit(eventName, 'hey'), undefined, 'emit!')
  t.is(refs.immediate, undefined, 'immediate component removed')
  t.is(refs.normal, undefined, 'normal component removed')
  t.is(refs.once, undefined, 'once component removed')
  t.is(spyOff.callCount, 3, '"off" called thrice to remove all listeners')
  t.is(spyOn.callCount, 2, '"on" called twice')
  t.is(spyOnce.callCount, 1, '"once" called once')
  t.is(spyEmit.callCount, 3, '"emit" called thrice (by test only)')
  t.end()
})
