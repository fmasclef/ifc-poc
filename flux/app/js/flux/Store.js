/**
 * Store
 *
 * This store handles the form state.
 */

import EventEmitter from 'events'
import Dispatcher from './Dispatcher'
import constants from 'constants'

class Store extends EventEmitter {

  constructor() {
    super()
    this.data = { }
    Dispatcher.register((payload) => {
      var action = payload.action
      console.log('[store] ' + action)
      switch(action) {
        case constants.storage.updated:
          this.data = JSON.parse(localStorage.getItem("data"))
          this.emit('change')
          break
      }
    })
  }

  getData() {
    return this.data
  }

  setData(data) {
    this.data = data
    localStorage.setItem("data", JSON.stringify(this.data))
    this.emit('change')
  }

}

export let store = new Store()