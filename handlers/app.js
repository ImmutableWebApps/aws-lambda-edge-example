'use strict'

const { createResponse, getOptions } = require('../lib')

const name = 'aws-lambda-edge'

const createHandler = env => {
  return (event, context, callback) => {
    getOptions({ env, name }, (err, options) => {
      const req = formatReq(event)
      if (err) return callback(err)
      const response = createResponse(req, options)
      callback(null, response)
    })
  }
}

const formatReq = event => {
  const url = event.Records[0].cf.request.uri
  return { url }
}

exports.testHandler = createHandler('test')
exports.prodHandler = createHandler('prod')
