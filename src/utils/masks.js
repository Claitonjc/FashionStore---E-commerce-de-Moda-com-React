export const maskPhone = (value) => {
  if (!value) return;

  let phoneNumber = value.replace(/\D/g, "").slice(0, 11);

  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`.trim();
};

export const maskCpf = (value) => {
  if (!value) return "";

  let cpfNumber = value.replace(/\D/g, "").slice(0, 11);

  return `${cpfNumber.slice(0, 3)}.${cpfNumber.slice(3, 6)}.${cpfNumber.slice(6, 9)}-${cpfNumber.slice(9)}`.trim();
};

export const maskCard = (value) => {
  if (!value) return;

  let cardNumber = value.replace(/\D/g, "").slice(0, 16);

  return `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12)}`.trim();
};

export const maskCardNumber = (value) => {
  if (!value) return "";

  const cardNumber = value.replace(/\D/g, "").slice(0, 16);

  const lastFour = cardNumber.slice(-4);

  return `**** **** **** ${lastFour}`;
};
