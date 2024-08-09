// This file is taken from Bootstrap and adapted.

/* eslint-env node, es6 */

'use strict'

const version = process.argv[2] || ''

const year = new Date().getFullYear()

const stampTop =
`/*!
  * Simple-Jekyll-Search ${version}
  * Copyright 2015-${year}, Christian Fei
  * Licensed under the MIT License.
  */

`

process.stdout.write(stampTop)
process.stdin.pipe(process.stdout)
