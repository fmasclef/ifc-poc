/**
 * Navigation bar
 *
 * A simple wrapper used to create navbar.
 */

import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  /**
   * Renderer
   */

  render() {

    return (
      <div className='nav'>
        <div className='nav-content'>
          <div className='nav-links'>
            <Link to='/form'>Form</Link>
            <Link to='/display'>Display</Link>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(NavBar)