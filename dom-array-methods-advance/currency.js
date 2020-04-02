// Double eveyones money
function doubleMoney(users = []) {
	return users.map(user => {
		return {
			...user,
			money: user.money * 2,
		}
	})
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
