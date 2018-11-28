'use strict'

const { gzip } = require('zlib')

const createContent = require('./content')

const appVersionCookieName = 'appVersion'

const getResponse = (req, options, callback) => {
  try {
    const optionsFromReq = getOptionsFromReq(req, options)
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

const getOptionsFromReq = (req, options) => {
  const version = getVersionFromReq(req) || options.version
  return Object.assign(options, {
    version
  })
}

const getVersionFromReq = req => {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(';')
  if (!cookies) return null
  const cookie = cookies
    .map(c => c.split('='))
    .find(([n]) => n === appVersionCookieName)
  return cookie && cookie[1]
}

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
