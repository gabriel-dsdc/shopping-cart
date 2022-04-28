const getSavedCartItems = (cart) => {
  const cartItems = cart;
  cartItems.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
