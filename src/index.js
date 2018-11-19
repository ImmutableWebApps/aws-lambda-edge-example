import React from 'react'
import { render } from 'react-dom'

import './main.css'

const defaultAppConfig = {
  title: 'Lambda@Edge Immutable Web App'
}

const { title } = window.config || defaultAppConfig

const App = ({ title }) => (
  <main>
    <h1>{title}</h1>
    <div className='logo' />
  </main>
)
const renderApp = () => render(<App title={title} />, document.getElementById('root'))

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', renderApp)
}
