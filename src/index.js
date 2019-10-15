
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Routers from './router'
// import FastClick from 'fastclick'

import './index.css'

// FastClick.attach(document.body);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <HashRouter>
        <Routers />
      </HashRouter>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)