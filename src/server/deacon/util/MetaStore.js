/**
* Store for all metadatas retrieve from decorators
**/

class MetaStore {
  constructor () {
    this.reset()
  }

  reset () {
    this.controllers = []
    this.middlewares = []
    this.actions = []
  }
}

const instance = new MetaStore()

export default instance
