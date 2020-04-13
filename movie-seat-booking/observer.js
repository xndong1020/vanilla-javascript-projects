class Observer {
    constructor() {
      this.subscribers = []
    }
  
    subscribe = fn => {
      this.subscribers.push(fn)
    }
  
    unsubscribe = fn => {
      const fnIndex = this.subscribers.findIndex(subscriber => subscriber === fn)
      if (fnIndex !== -1) this.subscribers.splice(fnIndex, 1)
    }
  
    count = () => {
      return this.subscribers.length
    }
  
    notify = message => {
      this.subscribers.map(subscriber => subscriber(message))
    }
  }
  