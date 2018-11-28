'use strict'

const http = require('http')
const https = require('https')
const { URL } = require('url')

const { render } = require('mustache')

const templateName = 'index.html.mustache'

const templateCache = {}

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
    const cachedTemplate = templateCache[url]
    if (cachedTemplate) return callback(null, cachedTemplate)
    httpGet(url, (err, template) => {
      try {
        if (err) return callback(err)
        templateCache[url] = template
        callback(null, template)
      } catch (err) {
        callback(err)
      }
    })
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
