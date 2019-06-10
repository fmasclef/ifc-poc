/**
 * Form page
 *
 * A checkbox.
 */

import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import NavBar from './NavBar.react'
import { store } from './flux/Store'

class FormPage extends React.Component {

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

  handleStatusChange(event) {
    this.setState({status: event.target.checked})
    store.setData({status: event.target.checked})
  }

  /**
   * Renderer
   */

  render() {

    return (
      <>
        <NavBar />
        <div className='content'>
          Are you happy today?<br/>
          <input type="checkbox" onChange={(e) => { this.handleStatusChange(e) }} checked={this.state.status} />
        </div>
      </>
    )
  }

}

export default withRouter(FormPage)