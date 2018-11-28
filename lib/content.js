'use strict'

const { render } = require('mustache')

const createContent = (template, {
  config,
  origin,
  root,
  version
}) => {
  const encodedConfig = encodeURIComponent(config)
  return render(template, {
    root,
    version,
    config: encodedConfig
  })
}

module.exports = createContent
