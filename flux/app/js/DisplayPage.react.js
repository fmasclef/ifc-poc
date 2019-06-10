/**
 * Display page
 *
 * Some info, nothing fancy.
 */

import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import NavBar from './NavBar.react'
import { store } from './flux/Store'

class DisplayPage extends React.Component {

  /**
   * Lifecycle
   */

  constructor(props) {
    super(props)

    this.state = Object.assign({ status: false }, store.getData())

    this.handleStoreChange = this._handleStoreChange.bind(this)
    store.on('change', this.handleStoreChange)
  }

  componentWillUnmount() {
    store.off('change', this.handleStoreChange)
  }

  _handleStoreChange() {
    this.setState(store.getData())
  }

  /**
   * Renderer
   */

  render() {

    return (
      <>
        <NavBar />
        <div className='content'>
          {this.state.status ? ':)' : ':('}
        </div>
      </>
    )
  }

}

export default withRouter(DisplayPage)