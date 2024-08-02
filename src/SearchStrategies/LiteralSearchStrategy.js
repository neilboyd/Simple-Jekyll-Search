'use strict'

module.exports = new LiteralSearchStrategy()

const segmenter = new Intl.Segmenter([], { granularity: 'word' });

function LiteralSearchStrategy() {
  this.matches = function (str, crit) {
    if (!str) return false
    str = str.trim().toLowerCase()

    let exact = false
    if (crit.endsWith(' ')) {
      exact = true
    }
    if (crit.startsWith('"') && crit.endsWith('"')) {
      exact = true
      crit = crit.substring(1, crit.length - 1)
    }
    crit = crit.toLowerCase()
    let critArray = [crit]
    if (!exact) {
      const segmentedText = segmenter.segment(crit);
      critArray = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
    }

    return (
      critArray
        .filter((word) => str.indexOf(word) >= 0)
        .length === critArray.length
    )
  }
}
