const formatAsCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  });

  return formatter.format(num);
};

export default formatAsCurrency;