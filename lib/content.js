'use strict'

const createIndex = ({ root }) => `
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
    <script src="${root}/index.js"></script>
  </body>
`

const createContent = ({
  origin,
  version
}) => {
  const root = [origin, version].filter(x => x).join('/')
  return createIndex({ root })
}

module.exports = createContent
