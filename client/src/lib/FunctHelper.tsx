const REG_EMAIL = /@[0-9]mail/g;

const checkEmail = (Email: string) => {
  if (!Email) return false;
  return REG_EMAIL.test(Email);
};


const FormatMoney = (data: string) => {
  return data.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export { checkEmail, FormatMoney};
