const test = require('ava')

const LiteralSearchStrategy = require('../../src/SearchStrategies/LiteralSearchStrategy')

test('matches a word that is contained in the search criteria (single words)', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('world').matches('hello world test search text'), true)
})

test('does not match if a word is not contained in the search criteria', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('hello my world').matches('hello world test search text'), false)
})

test('matches a word that is contained in the search criteria (multiple words)', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('hello text world').matches('hello world test search text'), true)
})

test('matches exact words when exacts words with quotes in the search criteria', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('"hello world"').matches('hello world test search text'), true)
})

test('matches exact last words when exacts words with quotes in the search criteria', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('"search text"').matches('hello world test search text'), true)
})

test('matches a word that is partially contained in the search criteria', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('test').matches('this tasty tester text'), true)
})

test('matches when search criteria has puncuation', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('hello, world!').matches('hello world test search text'), true)
})

test('does not match when only only one word of search criteria is in the text', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('hello muppet').matches('hello world test search text'), false)
})

test('does not match when no words in search criteria', t => {
  t.deepEqual(LiteralSearchStrategy.setCriteria('@@~~@@').matches('hello world'), false)
})
