export const getCategory = (search) => {
  return search.match(/(Bags|Accessories|Sports)/i)[0];
};
