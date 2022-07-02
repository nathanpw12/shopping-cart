const fetchItem = async (item) => {
  const URL = `https://api.mercadolibre.com/items/${item}`;
  try {
    const wantedData = await fetch(URL);
    const results = await wantedData.json();
    return results;
  } catch (error) {
  return error; 
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
