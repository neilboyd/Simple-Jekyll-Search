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

test('highlightMatchedText trims to correct length', t => {
  const value = utils.highlightMatchedText('1234 test 1234567890', 'test', 20)
  const expected = '1234 <b>test</b> 123'
  t.deepEqual(value, expected)
  t.deepEqual(expected.length, 20)
})

test('highlightMatchedText hightlight multiple text', t => {
  const value = utils.highlightMatchedText('foo test bar doo dah', 'test doo')
  t.deepEqual(value, 'foo <b>test</b> bar <b>doo</b> dah')
})

test('highlightMatchedText nothing matched nothing highlighted', t => {
  const value = utils.highlightMatchedText('foo test bar', 'blah')
  t.deepEqual(value, 'foo test bar')
})

test('highlightMatchedText doesnt remove closing tag', t => {
  const value = utils.highlightMatchedText('12345 test12345678901234567890 1234567890', 'test12345678901234567890', 20)
  t.deepEqual(value, '12345 <b>test123</b>')
})
test('highlightMatchedText doesnt trim opening tag', t => {
  const value = utils.highlightMatchedText('1234 test 1234 test 1234', 'test', 24)
  t.deepEqual(value, '1234 <b>test</b> 1234 ')
})

test('highlightMatchedText doesnt trim closing tag', t => {
  const value = utils.highlightMatchedText('1234 test 1234 test 1234', 'test', 32)
  t.deepEqual(value, '1234 <b>test</b> 1234 <b>tes</b>')
})
