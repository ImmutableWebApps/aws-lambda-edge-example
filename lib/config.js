'use strict'

const { SSM } = require('aws-sdk')

const parameterNames = [
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
  const { appVersion, assetDomain } = getObjectOfParameters(params)
  return {
    version: appVersion,
    origin: `https://${assetDomain}`
  }
}

const getParameters = (name, env, callback) => {
  const ssm = new SSM()
  const Names = parameterNames.map(
    k => ['/app', name, env, k].join('/')
  )
  const params = { Names }
  ssm.getParameters(params, callback)
}

const getOptions = ({ env, name } = {}, callback) => {
  getParameters(name, env, (err, data) => {
    if (err) return callback(err)
    const options = getOptionsFromParameters(data.Parameters)
    callback(null, options)
  })
}

module.exports = getOptions
