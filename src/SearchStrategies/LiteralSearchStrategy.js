'use strict'

module.exports = new LiteralSearchStrategy()

const segmenter = new Intl.Segmenter([], { granularity: 'word' })

function LiteralSearchStrategy () {
  this.critArray = []
  this.setCriteria = function (crit) {
    crit = crit.trim().toUpperCase()
    if (crit.startsWith('"') && crit.endsWith('"')) {
      this.critArray = [crit.substring(1, crit.length - 1)]
    } else {
      const segmentedText = segmenter.segment(crit)
      this.critArray = [...segmentedText]
        .filter((s) => s.isWordLike)
        .map((s) => s.segment)
    }
    return this
  }

  this.matches = function (str) {
    if (!str) {
      return false
    }
    if (this.critArray.length === 0) {
      return false
    }

    str = str.trim().toUpperCase()

    const filter = this.critArray.filter((word) => str.indexOf(word) >= 0)

    return filter.length === this.critArray.length // true if it found all the words
  }
}
