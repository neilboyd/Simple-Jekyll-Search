'use strict'

module.exports = {
  put,
  clear,
  search,
  setOptions
}

const FuzzySearchStrategy = require('./SearchStrategies/FuzzySearchStrategy')
const LiteralSearchStrategy = require('./SearchStrategies/LiteralSearchStrategy')

const data = []
let opt = {}

opt.fuzzy = false
opt.limit = 10
opt.searchStrategy = opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
opt.exclude = []

function put (data) {
  if (isObject(data)) {
    return addObject(data)
  }
  if (isArray(data)) {
    return addArray(data)
  }
  return undefined
}
function clear () {
  data.length = 0
  return data
}

function isObject (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject (_data) {
  data.push(_data)
  return data
}

function addArray (_data) {
  const added = []
  clear()
  for (let i = 0, len = _data.length; i < len; i++) {
    if (isObject(_data[i])) {
      added.push(addObject(_data[i]))
    }
  }
  return added
}

function search (crit) {
  if (!crit) {
    return []
  }
  if (opt.sort) {
    return findMatches(data, crit, opt).sort(opt.sort).splice(0, opt.limit)
  }
  return findMatches(data, crit, opt)
}

function setOptions (_opt) {
  opt = _opt || {}

  opt.fuzzy = opt.fuzzy || false
  opt.limit = opt.limit || 10
  opt.searchStrategy = opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
  opt.exclude = opt.exclude || []
}

function findMatches (data, crit, opt) {
  const matches = []
  for (let i = 0; i < data.length; i++) {
    if (!opt.sort && matches.length >= opt.limit) {
      break
    }
    const match = findMatchesInObject(data[i], crit, opt)
    if (match) {
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject (obj, crit, opt) {
  for (const key in obj) {
    if (key !== 'query' && !isExcluded(obj[key], opt.exclude) && opt.searchStrategy.matches(obj[key], crit)) {
      return obj
    }
  }
}

function isExcluded (term, excludedTerms) {
  for (let i = 0, len = excludedTerms.length; i < len; i++) {
    const excludedTerm = excludedTerms[i]
    if (new RegExp(excludedTerm).test(term)) {
      return true
    }
  }
  return false
}
