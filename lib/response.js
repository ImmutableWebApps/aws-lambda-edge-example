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
  body: createBody(options),
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

const createResponse = (req, options) => {
  const opts = extendOptions(options)
  if (req.url === '/favicon.ico') return createFaviconResponse(opts)
  return createIndexResponse(opts)
}

const extendOptions = options => {
  const { origin, version } = options
  return Object.assign(options, {
    root: [origin, version].filter(x => x).join('/')
  })
}

module.exports = createResponse
