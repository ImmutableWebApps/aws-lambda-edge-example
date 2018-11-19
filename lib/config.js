'use strict'

const { SSM } = require('aws-sdk')

const parameterNames = [
  'appConfig',
  'appVersion',
  'assetDomain'
]

const getObjectOfParameters = params => {
  const options = Object.assign.apply({},
    params.map(({ Name, Value }) => ({ [Name.split('/').slice(-1)[0]]: Value }))
  )
  for (const k of parameterNames) {
    if (options[k] == null) throw new Error(`Missing parameter ${k}`)
  }
  return options
}

const getOptionsFromParameters = params => {
  const { appConfig, appVersion, assetDomain } = getObjectOfParameters(params)
  return {
    config: appConfig,
    version: appVersion,
    origin: `https://${assetDomain}`
  }
}

const getParameters = ({ region, env, name }, callback) => {
  const ssm = new SSM({ region })
  const Names = parameterNames.map(
    k => ['/app', name, env, k].join('/')
  )
  const params = { Names }
  ssm.getParameters(params, callback)
}

const getOptions = ({ region, env, name } = {}, callback) => {
  getParameters({ region, env, name }, (err, data) => {
    if (err) return callback(err)
    const options = getOptionsFromParameters(data.Parameters)
    callback(null, options)
  })
}

module.exports = getOptions
