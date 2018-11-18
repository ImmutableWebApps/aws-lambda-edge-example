'use strict'

const http = require('http')
const path = require('path')

const serveHandler = require('serve-handler')

const { createResponse } = require('./handlers')

const port = 8080
const cdnPort = 8081
const host = 'localhost'

const formatHeaders = headers => Object.assign.apply({},
  Object.values(headers)
    .map(v => v[0])
    .map(({ key, value }) => ({ [key]: value }))
)

const cdnServer = http.createServer((req, res) => {
  const root = path.resolve(__dirname, 'dist')
  serveHandler(req, res, { public: root })
})

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(302, { location: `http://${host}:${cdnPort}/favicon.ico` })
    res.end()
    return
  }
  const { status, body, bodyEncoding, headers } = createResponse()
  res.writeHead(status, formatHeaders(headers))
  res.end(Buffer.from(body, bodyEncoding))
})

cdnServer.listen(cdnPort)
server.listen(port, () => { console.log(`http://${host}:${port}`) })
