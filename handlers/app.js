'use strict'

const { gzipSync } = require('zlib')

const getOrigin = () => {
  return 'https://d1895sbek3z1b1.cloudfront.net'
}

const getVersion = () => {
  return '0.0.0'
}

const createContent = root => `
  <!doctype html>
  <html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="${root}/index.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="${root}/index.js"></script>
  </body>
`

const createBody = ({ origin, version }) => {
  const root = [origin, version].filter(x => x).join('/')
  const content = createContent(root)
  const buffer = gzipSync(content)
  return buffer.toString('base64')
}

const createResponse = ({
  origin = 'http://localhost:8081',
  version = ''
} = {}) => ({
  headers: {
    'content-type': [{
      key: 'content-type',
      value: 'text/html; charset=utf-8'
    }],
    'content-encoding': [{
      key: 'content-encoding',
      value: 'gzip'
    }]
  },
  body: createBody({ origin, version }),
  bodyEncoding: 'base64',
  status: '200',
  statusDescription: 'OK'
})

exports.createResponse = createResponse

let response = null
exports.handler = (event, context, callback) => {
  const origin = getOrigin()
  const version = getVersion()
  if (response === null) response = createResponse({ origin, version })
  callback(null, response)
}
