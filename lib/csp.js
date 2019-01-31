'use strict'

const { createHash } = require('crypto')

const createCspHeader = (options, {
  scripts = []
}) => {
  const { origin, config } = options
  const { reportUri, api } = JSON.parse(config)
  const scriptHashes = scripts.map(cspHash)
  const directives = [
    ['default-src', origin],
    ['script-src', origin, ...scriptHashes],
    ['img-src', "'self'", origin],
    ['connect-src', api],
    ['frame-ancestors', 'none'],
    ['base-uri', 'none'],
    ['form-action', 'none'],
    ['report-uri', reportUri]
  ]
  return directives.map(d => d.join(' ')).join('; ')
}

const cspHash = script => {
  const hash = createHash('sha256')
  hash.update(script)
  const digest = hash.digest('base64')
  return `'sha256-${digest}'`
}

module.exports = createCspHeader
