import React from 'react'

import Data from './data'

import './main.css'

const App = ({ title, api }) => (
  <main>
    <h1>{title}</h1>
    <div className='logo' />
    <Data api={api} />
  </main>
)

export default App
