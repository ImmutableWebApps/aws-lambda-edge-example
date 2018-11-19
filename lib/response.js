'use strict'

const { gzip } = require('zlib')

const createContent = require('./content')

const getBody = (content, callback) => {
  gzip(content, (err, buffer) => {
    if (err) return callback(err)
    const body = buffer.toString('base64')
    callback(null, body)
  })
}

const getIndexResponse = (options, callback) => {
  const content = createContent(options)
  getBody(content, (err, body) => {
    if (err) return callback(err)
    const response = createIndexResponse(body)
    callback(null, response)
  })
}

const createIndexResponse = body => ({
  headers: {
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

const getResponse = (req, options, callback) => {
  const opts = extendOptions(options)
  if (req.url === '/favicon.ico') {
    return callback(null, createFaviconResponse(opts))
  }
  getIndexResponse(opts, callback)
}

const extendOptions = options => {
  const { origin, version } = options
  return Object.assign(options, {
    root: [origin, version].filter(x => x).join('/')
  })
}

module.exports = getResponse
