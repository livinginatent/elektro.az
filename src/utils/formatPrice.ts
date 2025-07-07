// Helper function for price formatting
export const formatPrice = (price: number | null) => {
  if (price === null || price === undefined || price === 0) {
    return "Qiymət mövcud deyil";
  }
  return `₼${price.toLocaleString()}`;
};
