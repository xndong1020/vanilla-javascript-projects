const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// customize toastr options
toastr.options = { positionClass: 'toast-bottom-right' }

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value.trim())) {
    showSuccess(input)
    return true
  }
  showError(input, 'Email is not valid')
  return false
}

// Check required fields
function checkRequired(inputArr = []) {
  if (!Array.isArray(inputArr) || inputArr.some(input => !input)) return false
  let isValid = true
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
      isValid = false
    }
    showSuccess(input)
  })

  return isValid
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
    return false
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    )
    return false
  }

  showSuccess(input)
  return true
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (!input1.value || !input2.value) {
    showError(input2, 'Passwords is required')
    return false
  }
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
    return false
  }
  return true
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// to record form validation statuses
function validateForm() {
  const results = [
    checkRequired([username, email, password, password2]),
    checkLength(username, 3, 15),
    checkLength(password, 6, 25),
    checkEmail(email),
    checkPasswordsMatch(password, password2),
  ]
  // return results.some(status => !status)
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault()

  const formValidationStatuses = validateForm()
  // if any input validation is falsy, means validations failed
  const notValid = validateForm()

  if (notValid) toastr.error('Failed!')
  else toastr.success('Works!')
})
