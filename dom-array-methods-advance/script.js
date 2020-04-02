const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let loadedUsers = [];
let sortDesc = false;

init();

// for initial page load

//--Use promise().then().finally()--
// loadingIndicator();
// getRandomUser()
//   .then(user => {
//     addData(user);
//   })
//   .finally(() => {
//     loadingIndicator(false);
//   });

async function init() {
  loadingIndicator();
  const user1 = await getRandomUser();
  const user2 = await getRandomUser();
  const user3 = await getRandomUser();
  loadedUsers = [user1, user2, user3];
  loadingIndicator(false);
  updateDOM(loadedUsers);
}

async function addUserClickHandler() {
  loadingIndicator();
  const user = await getRandomUser();
  loadingIndicator(false);
  addData(user);
}

function doubleMoneyClickHandler() {
  if (!Array.isArray(loadedUsers) || !loadedUsers.length) return;
  loadedUsers = doubleMoney(loadedUsers);
  updateDOM(loadedUsers);
}

// Sort users by richest
function sortByWealthClickHander() {
  // toggle sort order
  sortDesc = !sortDesc;
  // create different comparer based on 'sortDesc' value
  const sortFn = sortDesc
    ? (a, b) => b.money - a.money
    : (a, b) => a.money - b.money;
  loadedUsers = sortUsers(loadedUsers, sortFn);
  updateSortIcon(sortDesc);
  updateDOM(loadedUsers);
}

// Filter only millionaires
function showMillionairesClickHandler() {
  loadedUsers = getUsersByWealthAmont(loadedUsers, 1000000);
  updateDOM();
}

// Calculate the total wealth
function calculateWealthClickHander() {
  const wealth = getUsersTotalAmount(loadedUsers);
  updateWealthTotal(wealth);
}

// Add new obj to data arr
function addData(obj) {
  loadedUsers.push(obj);
  updateDOM();
}

// Event listeners
addUserBtn.addEventListener('click', addUserClickHandler);
doubleBtn.addEventListener('click', doubleMoneyClickHandler);
sortBtn.addEventListener('click', sortByWealthClickHander);
showMillionairesBtn.addEventListener('click', showMillionairesClickHandler);
calculateWealthBtn.addEventListener('click', calculateWealthClickHander);
