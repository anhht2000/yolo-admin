const REG_EMAIL = /\@+/;
const REG_PASS = /[A-Za-z0-9\d]{6,}$/;
const REG_PHONE = /[0-9]$/;
function validateEmail(Email: string) {
  if (!Email) return false;
  if (REG_EMAIL.test(Email)) {
  }
  return REG_EMAIL.test(Email);
}
function validatePassword(Password: string) {
  if (!Password) return false;
  return REG_PASS.test(Password);
}
function validatePhone(Phone: string) {
  if (!Phone) return false;
  return REG_PHONE.test(Phone);
}
export { validateEmail, validatePassword, validatePhone };
