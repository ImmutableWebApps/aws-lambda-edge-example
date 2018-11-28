'use strict'

const http = require('http')
const https = require('https')
const { URL } = require('url')

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
    httpGet(url, callback)
  } catch (err) {
    callback(err)
  }
}

const httpGet = (url, callback) => {
  try {
    const isHttps = new URL(url).protocol === 'https:'
    const get = isHttps ? https.get : http.get
    get(url, res => {
      const { statusCode } = res
      if (statusCode !== 200) callback(new Error(`Status Code ${statusCode}`))
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => { callback(null, data) })
      res.on('err', callback)
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
