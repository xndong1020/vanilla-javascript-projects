describe(`Test suite for 'DOM' module`, function() {
  const main = document.getElementById('main')
  // reset main html to empty before each test
  afterEach(() => {
    main.innerHTML = ''
  })

  it(`'updateDOM' should update main div with users name and money`, function() {
    const users = [
      { name: 'fake 01', money: 10 },
      { name: 'fake 02', money: 20 },
    ]
    updateDOM(users)

    const text = main.innerHTML

    expect(text).toContain('fake 01')
    expect(text).toContain('fake 02')
    expect(text).toContain(10)
    expect(text).toContain(20)
  })

  describe(`'updateSortIcon' should update button with correct icon`, function() {
    let btnEl
    let btnText
    beforeEach(() => {
      btnEl = document.getElementById('sort')
    })
    afterEach(() => {
      btnEl.innerHTML = 'Sort Wealth ↓'
    })
    it('should show ↓ when sortDesc param is set to false', function() {
      updateSortIcon(false)
      btnText = btnEl.innerText
      expect(btnText).toContain('Sort Wealth ↓')
    })

    it('should show ↑ when sortDesc param is set to true', function() {
      updateSortIcon(true)
      btnText = btnEl.innerText
      expect(btnText).toContain('Sort Wealth ↑')
    })
  })

  describe(`'updateWealthTotal' should update totalWealth with correct text`, function() {
    let loadedUsers

    beforeEach(() => {
      loadedUsers = []
    })

    afterEach(() => {
      const wealth = document.getElementById('total')
      wealth.remove()
    })
    it('when wealth total is zero', function() {
      updateWealthTotal(loadedUsers)
      const wealth = document.getElementById('total')
      const wealthHTML = wealth.innerHTML
      expect(wealthHTML).toContain('Please add some user')
    })

    it('when wealth total is greater than zero', function() {
      loadedUsers = [
        { name: 'fake 01', money: 10 },
        { name: 'fake 02', money: 20 },
      ]
      updateWealthTotal(loadedUsers)
      const wealth = document.getElementById('total')
      const wealthHTML = wealth.innerHTML
      expect(wealthHTML).toContain(30)
    })
  })

  describe(`'loadingIndicator' should show/hide properly`, function() {
    it('should show loadingIndicator', function() {
      loadingIndicator()
      const loadingIndicatorEl = document.getElementById('loadingIndicator')
      const loadingIndicatorText = loadingIndicatorEl.innerText
      expect(loadingIndicatorText).toContain('Loading data from API...')
    })

    it('should hide loadingIndicator', function() {
      loadingIndicator(false)
      const loadingIndicatorEl = document.getElementById('loadingIndicator')
      const display = loadingIndicatorEl.getAttribute('style')
      expect(display).toContain('display: none')
    })
  })
})
