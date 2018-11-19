'use strict'

const { createServer } = require('http')
const path = require('path')

const serveHandler = require('serve-handler')

const { getResponse } = require('./lib')

const port = 8080
const assetPort = 8081
const host = 'localhost'
const options = {
  config: '{"title":"Lambda@Edge Immutable Web App"}',
  origin: `http://${host}:${assetPort}`,
  version: ''
}

const formatHeaders = headers => Object.assign.apply({},
  Object.values(headers)
    .map(v => v[0])
    .map(({ key, value }) => ({ [key]: value }))
)

const assetServer = createServer((req, res) => {
  const root = path.resolve(__dirname, 'dist')
  serveHandler(req, res, { public: root })
})

const server = createServer((req, res) => {
  const handleError = err => {
    console.error(err)
    res.writeHead(500)
    res.end()
  }

  const handleResponse = response => {
    const { status, body, bodyEncoding, headers } = response
    res.writeHead(status, formatHeaders(headers))
    if (!body) return res.end()
    const data = Buffer.from(body, bodyEncoding)
    res.end(data)
  }

  getResponse(req, options, (err, response) => {
    try {
      if (err) handleError(err)
      handleResponse(response)
    } catch (error) {
      handleError(error)
    }
  })
})

assetServer.listen(assetPort)
server.listen(port, () => { console.log(`http://${host}:${port}`) })
