'use strict'

const fuzzysearch = require('fuzzysearch')

module.exports = new FuzzySearchStrategy()

function FuzzySearchStrategy () {
  this.criteria = ''
  this.setCriteria = function (crit) {
    this.criteria = crit.toUpperCase()
    return this
  }

  this.matches = function (string) {
    if (string === null) {
      return false
    }
    return fuzzysearch(this.criteria, string.toUpperCase())
  }
}
