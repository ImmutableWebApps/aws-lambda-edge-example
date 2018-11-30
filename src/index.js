import React from 'react'
import { render } from 'react-dom'

import App from './app'

const rootElementId = 'root'

const defaultAppConfig = {
  title: 'Lambda@Edge Immutable Web App',
  api: 'https://httpbin.org'
}

const renderApp = () => {
  const config = window.config || defaultAppConfig
  render(
    <App {...config} />,
    document.getElementById(rootElementId)
  )
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', renderApp)
}
