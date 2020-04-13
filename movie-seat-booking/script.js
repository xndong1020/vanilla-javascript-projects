const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

// Use Observer pattern
const observer = new Observer()
observer.subscribe(updateSelectedCount)

// Add a "+" sign in front is the easiest way to convert string to number.
let ticketPrice = +movieSelect.value

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // Three steps to generate selected seat index
  // 1. Copy selected seats into array
  // 2. Map through array
  // 3. return a new array indexes

  // const selectedSeatsIndeciesArray = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  // Here Array.from(selectedSeats) can also copy the NodeList of selectedSeats into a array
  const selectedSeatsIndeciesArray = Array.from(selectedSeats).map(seat =>
    [...seats].indexOf(seat)
  )

  // localStorage let you store strings in the browser.
  // With localStorage, there's no need to import any libary or anything. It build into the browser.
  localStorage.setItem(
    'selectedSeatsIndeciesArray',
    JSON.stringify(selectedSeatsIndeciesArray)
  )

  const selectedSeatsCount = selectedSeats.length

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeatsIndeciesArray = JSON.parse(
    localStorage.getItem('selectedSeatsIndeciesArray')
  )

  if (
    selectedSeatsIndeciesArray !== null &&
    selectedSeatsIndeciesArray.length > 0
  ) {
    seats.forEach((seat, seatIdx) => {
      if (selectedSeatsIndeciesArray.includes(seatIdx))
        seat.classList.add('selected')
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  if (observer) observer.notify()
})

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    // observer help to call the udpateSelectedCount()
    // The benefit is that if there are more than one function needs to be called, and they all subscribe to one observer. So we only need to monitor all the subscribers together by one observer.
    if (observer) observer.notify()
  }
})

// Call this on page load to initial count and total set
updateSelectedCount()
