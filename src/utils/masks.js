export const maskPhone = (value) => {
  if (!value) return;

  let phoneNumber = value.replace(/\D/g, "");

  phoneNumber = phoneNumber.substring(0, 11);

  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
};

export const maskCpf = (value) => {
  if (!value) return;

  let cpfNumber = value.replace(/\D/g, "");

  cpfNumber = cpfNumber.substring(0, 11);

  return `${cpfNumber.slice(0, 3)}.${cpfNumber.slice(3, 6)}.${cpfNumber.slice(6, 9)}-${cpfNumber.slice(9)}`;
};
