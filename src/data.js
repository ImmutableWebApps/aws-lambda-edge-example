/* global fetch */

import React, { Component } from 'react'

class Data extends Component {
  constructor (...args) {
    super(...args)
    this.state = { data: null }
  }

  componentWillMount () {
    loadData(this.props.api)
      .then(data => { this.setState({ data }) })
      .catch(console.error)
  }

  render () {
    if (this.state.data === null) return null
    return <p>{this.state.data.uuid}</p>
  }
}

const loadData = api => fetch(`${api}/uuid`).then(d => d.json())

export default Data
