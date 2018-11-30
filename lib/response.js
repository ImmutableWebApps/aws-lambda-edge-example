'use strict'

const { gzip } = require('zlib')

const getIndexContent = require('./content')
const createCspHeader = require('./csp')
const getOptions = require('./options')

const getResponse = (req, options, callback) => {
  try {
    const extendedOptions = getOptions(req, options)

    if (req.url === '/favicon.ico') {
      const favicon = createFaviconResponse(extendedOptions)
      return callback(null, favicon)
    }

    getIndexResponse(extendedOptions, callback)
  } catch (error) {
    callback(error)
  }
}

const getIndexResponse = (options, callback) => {
  getIndexContent(options, (err, { content, scripts }) => {
    if (err) return callback(err)
    getBody(content, (err, body) => {
      try {
        if (err) return callback(err)
        const csp = createCspHeader(options, { scripts })
        const response = createIndexResponse(body, csp)
        callback(null, response)
      } catch (error) {
        callback(error)
      }
    })
  })
}

const getBody = (content, callback) => {
  gzip(content, (err, buffer) => {
    try {
      if (err) return callback(err)
      const body = buffer.toString('base64')
      callback(null, body)
    } catch (error) {
      callback(error)
    }
  })
}

const createIndexResponse = (body, csp) => ({
  headers: {
    'content-security-policy': [{
      key: 'Content-Security-Policy',
      value: csp
    }],
    'cache-control': [{
      key: 'Cache-Control',
      value: 'no-cache, no-store, must-revalidate'
    }],
    'content-type': [{
      key: 'Content-Type',
      value: 'text/html; charset=utf-8'
    }],
    'content-encoding': [{
      key: 'Content-Encoding',
      value: 'gzip'
    }]
  },
  body,
  bodyEncoding: 'base64',
  status: '200',
  statusDescription: 'OK'
})

const createFaviconResponse = ({
  root
}) => ({
  headers: {
    location: [{
      key: 'Location',
      value: `${root}/favicon.ico`
    }]
  },
  status: '302',
  statusDescription: 'Found'
})

module.exports = getResponse
