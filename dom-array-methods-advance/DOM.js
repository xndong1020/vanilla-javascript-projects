// Update DOM
function updateDOM(providedData = loadedUsers) {
  // Clear main div.如果这里不用main.innerHTML clear main div, 那么random user会反复的重复的出现并叠加。
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function updateSortIcon(desc) {
  const btn = document.getElementById('sort');
  const btnText = desc ? `Sort Wealth ↑` : `Sort Wealth ↓`;
  btn.innerText = btnText;
}

function updateWealthTotal(wealth = 0) {
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = !wealth
    ? `Please add some user`
    : `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

function loadingIndicator(display = true) {
  const loadingIndicatorEl = document.createElement('h2');
  loadingIndicatorEl.innerHTML = `Loading data from API...`;
  main.appendChild(loadingIndicatorEl);

  if (display) loadingIndicatorEl.setAttribute('style', 'display: block;');
  else loadingIndicatorEl.setAttribute('style', 'display: none;');
}
