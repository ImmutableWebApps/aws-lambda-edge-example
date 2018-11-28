'use strict'

const { get } = require('http')

const { render } = require('mustache')

const templateName = 'index.html.mustache'

const getIndexContent = (options, callback) => {
  getIndexTemplate(options, (err, template) => {
    try {
      if (err) return callback(err)
      const content = createContent(template, options)
      callback(null, content)
    } catch (error) {
      callback(error)
    }
  })
}

const getIndexTemplate = (options, callback) => {
  try {
    const url = `${options.root}/${templateName}`
    get(url, resp => {
      let data = ''
      resp.on('data', chunk => { data += chunk })
      resp.on('end', () => { callback(null, data) })
      resp.on('err', callback)
    })
  } catch (err) {
    callback(err)
  }
}

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

module.exports = getIndexContent
