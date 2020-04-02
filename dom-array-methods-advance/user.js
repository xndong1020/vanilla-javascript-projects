// Fetch random user and add money
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api')
	const data = await res.json()

	const user = data.results[0]

	return {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	}
}

function getUsersByWealthAmount(users = [], amount = 0) {
	return users.filter(user => Number(user.money) >= amount)
}

function sortUsers(users = [], sortFn) {
	return users.sort(sortFn)
}

function getUsersTotalAmount(users = []) {
	return users.reduce((acc, user) => (acc += user.money), 0)
}
