const fetchProducts = async (produto) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
