'use strict'

const { getResponse, getOptionsFromSsm } = require('../lib')

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
  getOptionsFromSsm({ region, stage, name }, handleRequest)
}

const formatReq = event => {
  const request = event.Records[0].cf.request
  const url = request.uri
  const headers = formatHeaders(request.headers)
  return {
    url,
    headers
  }
}

const formatHeaders = headers => Object.assign.apply({},
  Object.values(headers)
    .map(v => v[0])
    .map(({ key, value }) => ({ [key.toLowerCase()]: value }))
)

exports.liveHandler = createHandler('live')
exports.experimentalHandler = createHandler('experimental')
