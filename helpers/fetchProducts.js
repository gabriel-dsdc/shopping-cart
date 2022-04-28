const fetchProducts = (query) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
.then((res) => res.json()).catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
