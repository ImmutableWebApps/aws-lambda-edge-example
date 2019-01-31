'use strict'

module.exports = {
  'referrer-policy': [{
    key: 'Referrer-Policy',
    value: 'same-origin'
  }],
  'strict-transport-security': [{
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; preload'
  }],
  'x-content-type-options': [{
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }],
  'x-frame-options': [{
    key: 'X-Frame-Options',
    value: 'DENY'
  }],
  'x-xss-protection': [{
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }]
}
