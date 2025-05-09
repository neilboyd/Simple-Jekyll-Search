const test = require('ava')
const FuzzySearchStrategy = require('../../src/SearchStrategies/FuzzySearchStrategy')

test('does not match words that don\'t contain the search criteria', t => {
  t.deepEqual(FuzzySearchStrategy.setCriteria('fzyyy').matches('fuzzy'), false)
  t.deepEqual(FuzzySearchStrategy.setCriteria('angular').matches('react'), false)

  t.deepEqual(FuzzySearchStrategy.setCriteria('wth?').matches('what the heck'), false)
})

test('matches words containing the search criteria', t => {
  t.deepEqual(FuzzySearchStrategy.setCriteria('fzy').matches('fuzzy'), true)
  t.deepEqual(FuzzySearchStrategy.setCriteria('rct').matches('react'), true)

  t.deepEqual(FuzzySearchStrategy.setCriteria('wth').matches('what the heck'), true)
})

test('is case insensitive', t => {
  t.deepEqual(FuzzySearchStrategy.setCriteria('dc').matches('Different Cases'), true)
  t.deepEqual(FuzzySearchStrategy.setCriteria('upprcs').matches('UPPERCASE'), true)
  t.deepEqual(FuzzySearchStrategy.setCriteria('lc').matches('lowercase'), true)
  t.deepEqual(FuzzySearchStrategy.setCriteria('dc').matches('DiFfErENt cASeS'), true)
})
