export const calcTotalPrice = (cart) => {
  const subTotal = cart?.items?.reduce(
    (soma, produto) => soma + produto.price * produto.quantity,
    0,
  );

  const freight = (subTotal * 15) / 100;
  const total = subTotal + freight;

  return {
    subTotal,
    portion: total / 10,
    discount: total - (total * 10) / 100,
    freight,
    total,
  };
};
