'use strict'

const { SSM } = require('aws-sdk')

const parameterNames = [
  'appConfig',
  'appVersion',
  'assetDomain'
]

const getOptions = ({ region, stage, name } = {}, callback) => {
  getParameters({ region, stage, name }, (err, data) => {
    try {
      if (err) return callback(err)
      const options = getOptionsFromParameters(data.Parameters)
      callback(null, options)
    } catch (error) {
      callback(error)
    }
  })
}

const getOptionsFromParameters = params => {
  const { appConfig, appVersion, assetDomain } = getObjectOfParameters(params)
  return {
    config: appConfig,
    version: appVersion,
    origin: `https://${assetDomain}`
  }
}

const getObjectOfParameters = params => {
  const options = Object.assign.apply({},
    params.map(({ Name, Value }) => ({ [Name.split('/').slice(-1)[0]]: Value }))
  )
  for (const k of parameterNames) {
    if (options[k] == null) throw new Error(`Missing parameter ${k}`)
  }
  return options
}

const getParameters = ({ region, stage, name }, callback) => {
  try {
    const ssm = new SSM({ region })
    const Names = parameterNames.map(
      k => ['/app', name, stage, k].join('/')
    )
    const params = { Names }
    ssm.getParameters(params, callback)
  } catch (error) {
    callback(error)
  }
}

module.exports = getOptions
