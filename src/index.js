import React from 'react'
import { render } from 'react-dom'

import './main.css'

const App = () => (
  <main>
    <h1>Hello, world!</h1>
    <div className='logo' />
  </main>
)
const renderApp = () => render(<App />, document.getElementById('root'))

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', renderApp)
}
