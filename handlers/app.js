'use strict'

const { gzipSync } = require('zlib')

const cdn = process.env.CDN || 'http://localhost:8081'
const version = process.env.VERSION || ''

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

const createBody = () => {
  const root = [cdn, version].filter(x => x).join('/')
  const content = createContent(root)
  const buffer = gzipSync(content)
  return buffer.toString('base64')
}

const createResponse = () => ({
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
  body: createBody(),
  bodyEncoding: 'base64',
  status: '200',
  statusDescription: 'OK'
})

let response = null

exports.createResponse = createResponse

exports.handler = (event, context, callback) => {
  if (response === null) response = createResponse()
  callback(null, response)
}
