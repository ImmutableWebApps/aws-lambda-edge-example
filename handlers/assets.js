'use strict'

const { commonHeaders } = require('../lib')

const headers = Object.entries(commonHeaders)

const handler = (event, context, callback) => {
  const { response } = event.Records[0].cf
  for (const [k, v] of headers) response.headers[k] = v
  return callback(null, response)
}

exports.handler = handler
