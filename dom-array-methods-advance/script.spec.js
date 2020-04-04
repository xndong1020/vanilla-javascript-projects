describe(`Test suite for 'script' module`, function() {
  it(`'init' function should load 3 users initially`, function(done) {
    setTimeout(function() {
      expect(loadedUsers.length).toBe(3)
      done()
    }, 2000)
  })
})
