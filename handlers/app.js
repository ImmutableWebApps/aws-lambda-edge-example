'use strict'

const { getResponse, getOptions } = require('../lib')

const name = 'aws-lambda-edge'
const region = 'us-east-1'

const createHandler = stage => (event, context, callback) => {
  const handleRequest = (err, options) => {
    if (err) return callback(err)
    const req = formatReq(event)
    getResponse(req, options, callback)
  }
  getOptions({ region, stage, name }, handleRequest)
}

const formatReq = event => {
  const url = event.Records[0].cf.request.uri
  return { url }
}

exports.testHandler = createHandler('test')
exports.prodHandler = createHandler('prod')
