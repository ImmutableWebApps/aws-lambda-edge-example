'use strict'

const { gzip } = require('zlib')

const createContent = require('./content')

const getResponse = (req, options, callback) => {
  try {
    const optionsFromReq = getNewOptionsFromReq(req, options)
    const extendedOptions = getExtendedOptions(optionsFromReq)

    if (req.url === '/favicon.ico') {
      const favicon = createFaviconResponse(extendedOptions)
      return callback(null, favicon)
    }

    const content = createContent(extendedOptions)
    getIndexResponse(content, callback)
  } catch (error) {
    callback(error)
  }
}

const getNewOptionsFromReq = (req, options) => options

const getExtendedOptions = options => {
  const { origin, version } = options
  return Object.assign(options, {
    root: [origin, version].filter(x => x).join('/')
  })
}

const getIndexResponse = (content, callback) => {
  getBody(content, (err, body) => {
    try {
      if (err) return callback(err)
      const response = createIndexResponse(body)
      callback(null, response)
    } catch (error) {
      callback(error)
    }
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

module.exports = getResponse
