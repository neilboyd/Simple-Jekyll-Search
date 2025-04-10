'use strict'

module.exports = {
  merge,
  isJSON,
  highlightMatchedText
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
    if (result.length === 0) {
      // first or last character is space
      return
    }
    let j = 0
    while (true) {
      j = value.toUpperCase().indexOf(result.toUpperCase(), j)
      if (j < 0) {
        break
      }
      const k = j + result.length
      const highlighted = '<b>' + value.substring(j, k) + '</b>'
      value = value.substring(0, j) + highlighted + value.substring(k)
      j += highlighted.length // move past the previous match
    }
  })

  // trim start so that match is visible
  let s = value.indexOf('<b>')
  if (s > snippetPrefixLength) {
    s = s - snippetPrefixLength
  } else {
    s = 0
  }

  // trim start and end to snippet length
  value = value.substring(s, s + snippetLength)

  // if end is a partial tag, or a complete opening tag, then trim it
  const t = value.indexOf('<', snippetLength - 3)
  if (t !== -1) {
    value = value.substring(0, t)
  }

  // if last opening tag is after last closing tag, then add a new closing tag
  const o = value.lastIndexOf('<b>')
  const c = value.lastIndexOf('</b>')
  if (o > c) {
    return value + '</b>'
  }

  return value
}
