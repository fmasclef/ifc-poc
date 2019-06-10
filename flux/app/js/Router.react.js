/**
 * Main router
 *
 * Its purpose: switch between public and private app
 */

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FormPage from './FormPage.react'
import DisplayPage from './DisplayPage.react'

export default class MainRouter extends React.Component {

  /**
   * Lifecycle
   */

  constructor(props) {
    super(props)
  }

  /**
   * Renderer
   */

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/form' component={FormPage} />
          <Route exact path='/display' component={DisplayPage} />
          <Route component={FormPage} />
        </Switch>
      </Router>
    )
  }

}
