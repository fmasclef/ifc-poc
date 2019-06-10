/**
 * This is your React app  bootloader.  It will  make sure  your  Sass files are
 * compiled into CSS at build time (thanks to webpack and import statement).  At
 * runtime, your React app will  replace the content of div #app once loaded.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import constants from 'constants'

import dispatch from './flux/Dispatcher'
import MainRouter from './Router.react'
import disclamer from './disclamer.txt'

import '../sass/app.sass'
import Dispatcher from './flux/Dispatcher';

let
  html = document.querySelector('html'),
  container = document.getElementById('app')


/**
 * Print disclamer on console so the enduser knows about self-xss risks.
 */
console.log(
  '%c'+disclamer
  , 'color: rgb(100, 100, 100)'
)

/**
 * Handle StorageEvent
 * 
 * This will dispatch a Flux event in response to a StorageEvent
 */
localStorage.setItem("data", JSON.stringify({}))
window.addEventListener('storage', (e) => { Dispatcher.dispatch({ action: constants.storage.updated }) })

/**
 * Start partner webapp React app
 *
 * As we are running this code, the whole bundle has been loaded. So we can swap
 * our bootloader animation for the React app itself.
 */
ReactDOM.render(<MainRouter />, container)
