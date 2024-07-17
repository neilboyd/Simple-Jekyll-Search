'use strict'

module.exports = new LiteralSearchStrategy()

function LiteralSearchStrategy () {
  this.matches = function (str, crit) {
    if (!str) return false
    str = str.trim().toLowerCase()

    let exact = false
    if (crit.endsWith(' ')) {
      exact = true
    }
    if (crit.startsWith('"') && crit.endsWith('"')) {
      exact = true
      crit = crit.substring(1, crit.length - 2)
    }
    crit = crit.toLowerCase()
    crit = exact ? [crit] : crit.split(' ')

    return crit.filter(word => str.indexOf(word) >= 0).length === crit.length
  }
}
