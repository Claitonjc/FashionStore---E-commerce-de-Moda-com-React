export const calcTotalPrice = (cart) => {
  const subTotal =
    cart?.items?.reduce(
      (soma, produto) => soma + produto.price * produto.quantity,
      0,
    ) ?? 0;

  const freight = (subTotal * 15) / 100;
  const totalwithFreight = subTotal + freight;

  return {
    subTotal,
    installments: subTotal / 10,
    installmentsWithFreight: (subTotal + freight) / 10,
    totalWithDiscount: subTotal - (subTotal * 10) / 100,
    totalDiscountFreight: subTotal + freight - (subTotal * 10) / 100,
    freight,
    totalwithFreight,
  };
};
