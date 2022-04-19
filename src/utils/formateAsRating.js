export const formatAsRating = (rating) => {
  return String(rating)?.length > 2 ? String(rating).slice(0, 3) : `${rating}.0`;
};