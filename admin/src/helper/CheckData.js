// eslint-disable-next-line no-useless-escape

const REG_PRICE = /[0-9]$/
function validateName(name) {
  if (!name) return false
  else return true
}

function validateDe(description) {
  if (!description) return false
  else return true
}
function validatePrice(Price) {
  if (!Price) return false
  return REG_PRICE.test(Price)
}
export { validateName, validateDe, validatePrice }
