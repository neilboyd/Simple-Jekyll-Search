'use strict'

module.exports = new LiteralSearchStrategy()

const segmenter = new Intl.Segmenter([], { granularity: 'word' })

function LiteralSearchStrategy () {
  this.matches = function (str, crit) {
    if (!str) {
      return false
    }
    str = str.trim().toLowerCase()
    crit = crit.trim().toLowerCase()

    let critArray = []
    if (crit.startsWith('"') && crit.endsWith('"')) {
      critArray = [crit.substring(1, crit.length - 1)]
    } else {
      const segmentedText = segmenter.segment(crit)
      critArray = [...segmentedText]
        .filter((s) => s.isWordLike)
        .map((s) => s.segment)
    }

    const filter = critArray.filter((word) => str.indexOf(word) >= 0)

    return filter.length === critArray.length // true if it found all the words
  }
}
