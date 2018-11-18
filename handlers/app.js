'use strict'

const { createResponse, getOptions } = require('../lib')

const name = 'aws-lambda-edge'

const createHandler = env => {
  return (event, context, callback) => {
    getOptions({ env, name }, (err, options) => {
      if (err) return callback(err)
      const response = createResponse(options)
      callback(null, response)
    })
  }
}

exports.testHandler = createHandler('test')
