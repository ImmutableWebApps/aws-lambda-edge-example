'use strict'

const { getResponse, getOptions } = require('../lib')

const name = 'aws-lambda-edge'
const region = 'us-east-1'

const createHandler = stage => (event, context, callback) => {
  const handleRequest = (err, options) => {
    try {
      if (err) return callback(err)
      const req = formatReq(event)
      getResponse(req, options, callback)
    } catch (error) {
      callback(error)
    }
  }
  getOptions({ region, stage, name }, handleRequest)
}

const formatReq = event => {
  const url = event.Records[0].cf.request.uri
  return { url }
}

exports.liveHandler = createHandler('live')
exports.experimentalHandler = createHandler('experimental')
