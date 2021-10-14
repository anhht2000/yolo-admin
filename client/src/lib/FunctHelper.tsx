// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /\@+/;
const REG_PASS = /[A-Za-z0-9\d]{6,}$/;
const REG_PHONE = /[0-9]$/;
function validateEmail(Email: string) {
  if (!Email) return false;
  return REG_EMAIL.test(Email);
}

function format(n: string) {
  let te = Number(n);
  return (
    te
      .toFixed(1)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      .slice(0, -2) + ' VND'
  );
}
const FormatMoney = (data: string) => {
  return format(data);
};

function validatePassword(Password: string) {
  if (!Password) return false;
  return REG_PASS.test(Password);
}
function validatePhone(Phone: string) {
  if (!Phone) return false;
  return REG_PHONE.test(Phone);
}
export { validateEmail, validatePassword, validatePhone, FormatMoney };
