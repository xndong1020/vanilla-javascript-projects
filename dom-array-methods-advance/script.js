const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let loadedUsers = []
let sortDesc = false
let observer

init()

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
	observer = new Observer()
	observer.subscribe(updateDOM)

	loadingIndicator()

	const user1 = await getRandomUser()
	addData(user1)

	const user2 = await getRandomUser()
	addData(user2)

	const user3 = await getRandomUser()
	addData(user3)

	loadingIndicator(false)
}

async function addUserClickHandler() {
	loadingIndicator()
	const user = await getRandomUser()
	loadingIndicator(false)
	addData(user)
}

function doubleMoneyClickHandler() {
	if (!Array.isArray(loadedUsers) || !loadedUsers.length) return
	loadedUsers = doubleMoney(loadedUsers)
	updateDOM(loadedUsers)
}

// Sort users by richest
function sortByWealthClickHandler() {
	// toggle sort order
	sortDesc = !sortDesc
	// create different comparer based on 'sortDesc' value
	const sortFn = sortDesc
		? (a, b) => b.money - a.money
		: (a, b) => a.money - b.money
	loadedUsers = sortUsers(loadedUsers, sortFn)
	updateSortIcon(sortDesc)
	if (observer) observer.notify(loadedUsers)
}

// Filter only millionaires
function showMillionairesClickHandler() {
	loadedUsers = getUsersByWealthAmount(loadedUsers, 1000000)
	if (observer) observer.notify(loadedUsers)
}

// Calculate the total wealth
function calculateWealthClickHandler() {
	const wealth = getUsersTotalAmount(loadedUsers)
	updateWealthTotal(wealth)
}

// Add new obj to data arr
function addData(obj) {
	loadedUsers.push(obj)
	if (observer) observer.notify(loadedUsers)
}

// Event listeners
addUserBtn.addEventListener('click', addUserClickHandler)
doubleBtn.addEventListener('click', doubleMoneyClickHandler)
sortBtn.addEventListener('click', sortByWealthClickHandler)
showMillionairesBtn.addEventListener('click', showMillionairesClickHandler)
calculateWealthBtn.addEventListener('click', calculateWealthClickHandler)
