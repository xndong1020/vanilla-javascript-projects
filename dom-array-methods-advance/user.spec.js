describe(`Test suite for 'user' module`, function() {
  it(`'getRandomUser' should return 1 user at a time`, async function() {
    const result = await getRandomUser()
    expect(result.name).not.toBeUndefined()
    expect(result.money).toBeGreaterThan(0)
  })

  it(`'getUsersByWealthAmount' should return correct result`, function() {
    const users = [
      { name: 'fake 01', money: 10 },
      { name: 'fake 02', money: 20 },
      { name: 'fake 03', money: 30 },
    ]

    const result = getUsersByWealthAmount(users, 21)
    expect(result.length).toBe(1)
    expect(result[0].money).toBe(30)
  })

  it(`'sortUsers' should return correct result`, function() {
    const users = [
      { name: 'fake 01', money: 10 },
      { name: 'fake 02', money: 20 },
      { name: 'fake 03', money: 30 },
    ]

    const fnObj = {
      fn: (a, b) => b.money - a.money,
    }

    spyOn(fnObj, 'fn').and.returnValue(-1)

    const result = sortUsers(users, fnObj.fn)

    expect(fnObj.fn).toHaveBeenCalled()
    expect(result.length).toBe(3)
    expect(result[0].money).toBe(30)
  })

  it(`'getUsersTotalAmount' should return correct result`, function() {
    const users = [
      { name: 'fake 01', money: 10 },
      { name: 'fake 02', money: 20 },
      { name: 'fake 03', money: 30 },
    ]

    const result = getUsersTotalAmount(users)
    expect(result).toBe(60)
  })
})
