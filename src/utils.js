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

function highlightMatchedText (value, query, snippetLength = 200) {
  // make sure it has a reasonable minimum
  snippetLength = Math.max(snippetLength, 20)
  const snippetPrefixLength = Math.round(snippetLength / 2)

  // for exact search highlight full text, otherwise highlight each word
  const results =
    query.startsWith('"') && query.endsWith('"')
      ? [query.substring(1, query.length - 1)]
      : query.split(' ')

  // highlight each match
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

  // now trim to snippetLength
  const i = value.indexOf('<b>')
  if (i > snippetPrefixLength) {
    // trim start so that match is visible
    value = value.substring(i - snippetPrefixLength)
  }
  if (value.length > snippetLength) {
    // trim the amount of text shown
    value = value.substring(0, snippetLength)

    // TODO check that we didn't trim in the middle of a tag
  }
  return value
}
