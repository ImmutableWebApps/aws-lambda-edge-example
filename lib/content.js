'use strict'

const { render } = require('mustache')

const createContent = (template, {
  config,
  origin,
  root,
  version
}) => {
  const encodedConfig = encodeURIComponent(config)
  return createIndex(template, {
    root,
    config: encodedConfig
  })
}

const createIndex = render

module.exports = createContent
