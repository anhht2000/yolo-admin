const REG_EMAIL = /\@+/;
const REG_PASS = /[A-Za-z0-9\d]{6,}$/;
const REG_PHONE = /[0-9]$/;
function validateEmail(Email: string) {
  if (!Email) return false;
  return REG_EMAIL.test(Email);
};


const FormatMoney = (data: string) => {
  return data.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function validatePassword(Password: string) {
  if (!Password) return false;
  return REG_PASS.test(Password);
}
function validatePhone(Phone: string) {
  if (!Phone) return false;
  return REG_PHONE.test(Phone);
}
export { validateEmail, validatePassword, validatePhone ,FormatMoney};
