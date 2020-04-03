describe(`Test suite for 'Observer' module`, function() {
  let observer

  beforeEach(function() {
    observer = new Observer()
  })

  afterEach(function() {
    observer = null
  })

  it(`'subscribe' function should be able to add subscriber to 'subscribers' list`, function() {
    const testFn = () => {}
    observer.subscribe(testFn)

    expect(observer.subscribers.length).toBe(1)
    expect(observer.subscribers[0]).toEqual(testFn)
  })

  it(`'unsubscribe' function should be able to remove subscriber from 'unsubscribe' list`, function() {
    const testFn1 = () => {
      console.log('testFn1')
    }
    const testFn2 = () => {
      console.log('testFn2')
    }
    observer.subscribe(testFn1)
    observer.subscribe(testFn2)

    observer.unsubscribe(testFn1)

    expect(observer.subscribers.length).toBe(1)
    expect(observer.subscribers[0].toString()).toEqual(testFn2.toString())
  })

  it(`'unsubscribe' function should NOT remove unregister subscriber`, function() {
    const testFn1 = () => {
      console.log('testFn1')
    }
    const testFn2 = () => {
      console.log('testFn2')
    }
    observer.subscribe(testFn1)
    observer.subscribe(testFn2)

    const testFn3 = () => {
      console.log('testFn3')
    }
    observer.subscribe(testFn3)

    observer.unsubscribe(testFn3)

    expect(observer.subscribers.length).toBe(2)
    expect(observer.subscribers[0].toString()).toEqual(testFn1.toString())
    expect(observer.subscribers[1].toString()).toEqual(testFn2.toString())
  })

  it(`'count' function should return correct number`, function() {
    expect(observer.count()).toBe(0)
    const testFn1 = () => {
      console.log('testFn1')
    }
    const testFn2 = () => {
      console.log('testFn2')
    }
    observer.subscribe(testFn1)
    observer.subscribe(testFn2)

    expect(observer.count()).toBe(2)
  })

  it(`'notify' function should call members in subscribers list, with correct argument`, function() {
    const testFns = {
      testFn1: () => {
        console.log('testFn1')
      },
      testFn2: () => {
        console.log('testFn2')
      },
    }
    spyOn(testFns, 'testFn1')
    spyOn(testFns, 'testFn2')
    observer.subscribe(testFns.testFn1)
    observer.subscribe(testFns.testFn2)

    observer.notify(123)

    expect(observer.subscribers[0]).toHaveBeenCalledWith(123)
    expect(observer.subscribers[1]).toHaveBeenCalledWith(123)
  })
})
