const appVersionCookieName = 'appVersion'

const getOptions = (req, options) => {
  const optionsFromReq = getOptionsFromReq(req, options)
  const extendedOptions = getExtendedOptions(optionsFromReq)
  return extendedOptions
}

const getOptionsFromReq = (req, options) => {
  const version = getVersionFromReq(req) || options.version
  return Object.assign(options, {
    version
  })
}

const getVersionFromReq = req => {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(';')
  if (!cookies) return null
  const cookie = cookies
    .map(c => c.split('='))
    .find(([n]) => n === appVersionCookieName)
  return cookie && cookie[1]
}

const getExtendedOptions = options => {
  const { origin, version } = options
  return Object.assign(options, {
    root: [origin, version].filter(x => x).join('/')
  })
}

module.exports = getOptions
