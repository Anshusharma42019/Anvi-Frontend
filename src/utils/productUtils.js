// Product utility  for Anvi Showroom

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return product[key]?.toLowerCase().includes(value.toLowerCase());
    });
  });
};
export const calculateDiscount = (originalPrice, discountPercent) => {
  const discount = (originalPrice * discountPercent) / 100;
  return {
    originalPrice,
    discount,
    finalPrice: originalPrice - discount,
    savings: discount
  };
};

export const getRecommendations = (currentProduct, allProducts, limit = 3) => {
  return allProducts
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};