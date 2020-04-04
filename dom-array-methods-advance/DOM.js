// Update DOM
function updateDOM(providedData = []) {
  // Clear main div.如果这里不用main.innerHTML clear main div, 那么random user会反复的重复的出现并叠加。
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`
    main.appendChild(element)
  })
}

function updateSortIcon(desc) {
  const btn = document.getElementById('sort')
  const btnText = desc ? `Sort Wealth ↑` : `Sort Wealth ↓`
  btn.innerText = btnText
}

function updateWealthTotal(providedData = []) {
  const wealthEl = document.createElement('div')
  wealthEl.setAttribute('id', 'total')
  main.appendChild(wealthEl)

  if (!providedData.length) wealthEl.innerHTML = `Please add some user`

  const wealth = getUsersTotalAmount(providedData)
  // check if wealthEl is already created

  wealthEl.innerHTML = !wealth
    ? `Please add some user`
    : `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
}

function loadingIndicator(display = true) {
  const loadingIndicatorEl = document.createElement('h2')
  loadingIndicatorEl.setAttribute('id', 'loadingIndicator')
  loadingIndicatorEl.innerHTML = `Loading data from API...`
  main.appendChild(loadingIndicatorEl)

  if (display) loadingIndicatorEl.setAttribute('style', 'display: block;')
  else loadingIndicatorEl.setAttribute('style', 'display: none;')
}
