'use strict'

const { gzipSync } = require('zlib')

const createContent = require('./content')

const createBody = options => {
  const content = createContent(options)
  const buffer = gzipSync(content)
  return buffer.toString('base64')
}

const createIndexResponse = options => ({
  headers: {
    'cache-control': [{
      key: 'Cache-Control',
      value: 'max-age=0'
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
  body: createBody(options),
  bodyEncoding: 'base64',
  status: '200',
  statusDescription: 'OK'
})

const createFaviconResponse = ({
  origin
}) => ({
  headers: {
    location: [{
      key: 'Location',
      value: `${origin}/favicon.ico`
    }]
  },
  status: '302',
  statusDescription: 'Found'
})

const createResponse = (req, options) => {
  if (req.url === '/favicon.ico') return createFaviconResponse(options)
  return createIndexResponse(options)
}

module.exports = createResponse
