const test = require('ava')
const utils = require('../src/utils')

test('merges objects', t => {
  const defaultOptions = { foo: '', bar: '' }
  const options = { bar: 'overwritten' }
  const mergedOptions = utils.merge(defaultOptions, options)

  t.deepEqual(mergedOptions.foo, defaultOptions.foo)
  t.deepEqual(mergedOptions.bar, options.bar)
})

test('isJSON returns true if is JSON object', t => {
  t.true(utils.isJSON({ foo: 'bar' }))
})

test('highlightMatchedText hightlight text', t => {
  const value = utils.highlightMatchedText('foo test bar', 'test')
  t.deepEqual(value, 'foo <b>test</b> bar')
})
