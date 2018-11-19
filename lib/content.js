'use strict'

const createIndex = ({ root, config }) => `
  <!doctype html>
  <html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="${root}/index.css">
  </head>
  <body>
    <div id="root"></div>
    <script>window.config = JSON.parse(decodeURIComponent('${config}'))</script>
    <script src="${root}/index.js"></script>
  </body>
`

const createContent = ({
  config,
  origin,
  version
}) => {
  const root = [origin, version].filter(x => x).join('/')
  const encodedConfig = encodeURIComponent(config)
  return createIndex({
    root,
    config: encodedConfig
  })
}

module.exports = createContent
