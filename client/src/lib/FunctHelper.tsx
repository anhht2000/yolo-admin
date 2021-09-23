const REG_EMAIL = /@[0-9]mail/g;

const checkEmail = (Email: string) => {
  if (!Email) return false;
  return REG_EMAIL.test(Email);
};

export { checkEmail };
