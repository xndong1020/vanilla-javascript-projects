class Observer {
  constructor() {
    this.subscribers = []
  }

  subscribe = fn => {
    this.subscribers.push(fn)
  }

  unsubscribe = fn => {
    const fnIndex = this.subscribers.findIndex(subscriber => subscriber === fn)
    this.subscribers = this.subscribers.splice(fnIndex)
  }

  count = () => {
    return this.subscribers.length
  }

  notify = message => {
    this.subscribers.map(subscriber => subscriber(message))
  }
}
