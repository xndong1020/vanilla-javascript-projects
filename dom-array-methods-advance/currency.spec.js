describe(`Test suite for 'currency' module`, function() {
  it(`'doubleMoney' should return [] if no users`, function() {
    const target = []
    const result = doubleMoney(target)

    expect(result).toEqual([])
  })

  it(`'doubleMoney' should return users with money property doubled`, function() {
    const target = [
      { name: 'test1', money: 1 },
      { name: 'test2', money: 2 },
      { name: 'test3', money: 3 },
    ]
    const result = doubleMoney(target)

    expect(result).toEqual([
      { name: 'test1', money: 2 },
      { name: 'test2', money: 4 },
      { name: 'test3', money: 6 },
    ])
  })
})
