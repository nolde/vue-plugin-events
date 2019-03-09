module.exports = function createLoader (components) {
  return {
    name: 'loader',
    components: {
      ...components.reduce((m, c) => (m[c.name] = c) && m, {})
    },
    render: h => h('div', [
      ...components.map(c => h(c, { ref: c.name }, c.name))
    ])
  }
}
