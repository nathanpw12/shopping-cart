const fetchItem = async (item) => {
  const URL = `https://api.mercadolibre.com/items/${item}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
  return error; 
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
