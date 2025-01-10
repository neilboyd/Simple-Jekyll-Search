'use strict'

module.exports = {
  merge: merge,
  isJSON: isJSON,
  highlightMatchedText: highlightMatchedText
}

function merge (defaultParams, mergeParams) {
  const mergedOptions = {}
  for (const option in defaultParams) {
    mergedOptions[option] = defaultParams[option]
    if (typeof mergeParams[option] !== 'undefined') {
      mergedOptions[option] = mergeParams[option]
    }
  }
  return mergedOptions
}

function isJSON (json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

function highlightMatchedText (value, query) {
  // for exact search highlight full text, otherwise highlight each word
  const results =
    query.startsWith('"') && query.endsWith('"')
      ? [query.substring(1, query.length - 1)]
      : query.split(' ')
  results.forEach((result) => {
    let j = 0
    while (true) {
      j = value.toUpperCase().indexOf(result.toUpperCase(), j)
      if (j < 0) {
        break
      }
      const k = j + result.length
      value =
        value.substring(0, j) +
        '<b>' +
        value.substring(j, k) +
        '</b>' +
        value.substring(k)
      j += 4 // move past the previous match
    }
  })
  const i = value.indexOf('<b>')
  if (i > 100) {
    // trim start so that match is visible
    value = value.substring(i - 100)
  }
  if (value.length > 200) {
    // trim the amount of text shown
    value = value.substring(0, 200 + query.length)
  }
  return value
}
