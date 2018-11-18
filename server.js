'use strict'

const http = require('http')
const path = require('path')

const serveHandler = require('serve-handler')

const { createResponse } = require('./lib')

const port = 8080
const assetPort = 8081
const host = 'localhost'
const options = {
  origin: `http://${host}:${assetPort}`,
  version: ''
}

const formatHeaders = headers => Object.assign.apply({},
  Object.values(headers)
    .map(v => v[0])
    .map(({ key, value }) => ({ [key]: value }))
)

const assetServer = http.createServer((req, res) => {
  const root = path.resolve(__dirname, 'dist')
  serveHandler(req, res, { public: root })
})

const server = http.createServer((req, res) => {
  const { status, body, bodyEncoding, headers } = createResponse(req, options)
  res.writeHead(status, formatHeaders(headers))
  if (!body) return res.end()
  res.end(Buffer.from(body, bodyEncoding))
})

assetServer.listen(assetPort)
server.listen(port, () => { console.log(`http://${host}:${port}`) })
