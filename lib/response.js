'use strict'

const { gzipSync } = require('zlib')

const createContent = require('./content')

const createBody = options => {
  const content = createContent(options)
  const buffer = gzipSync(content)
  return buffer.toString('base64')
}

const createResponse = options => ({
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

module.exports = createResponse
