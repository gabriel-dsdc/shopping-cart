const productsSection = document.getElementsByClassName('items')[0];
const cartItems = document.getElementsByClassName('cart__items')[0];
const emptyCart = document.getElementsByClassName('empty-cart')[0];
const loading = document.getElementsByClassName('loading')[0];
const totalPrice = document.getElementsByClassName('total-price')[0];
let sum = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const saveCartTotalPrice = () => {
  localStorage.setItem('cartTotalPrice', sum);
};

const getSavedTotalPrice = () => {
  const getPrice = localStorage.getItem('cartTotalPrice');
  sum = getPrice ? parseFloat(getPrice) : 0;
  const currentTotal = Math.abs((sum).toFixed(2)
  .replace(/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/, '$1$2$3'));
  totalPrice.innerHTML = `${currentTotal}`;
};

function cartItemClickListener({ target }) {
  let price = target.innerText.match(/[+-]?\d+(\.\d+)?/g);
  price = parseFloat(price[price.length - 1]);
  const currentTotal = Math.abs((sum -= price).toFixed(2)
  .replace(/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/, '$1$2$3'));
  totalPrice.innerHTML = `${currentTotal}`;
  target.remove();
  saveCartItems(cartItems.innerHTML);
  saveCartTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
  });
  return li;
}

const addToCart = async (productId) => {
  const { id, title, price } = await fetchItem(productId);
  const product = {
    sku: id,
    name: title,
    salePrice: price,
  };
  cartItems.appendChild(createCartItemElement(product));
  const currentTotal = Math.abs((sum += price).toFixed(2)
  .replace(/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/, '$1$2$3'));
  totalPrice.innerHTML = `${currentTotal}`;
  saveCartItems(cartItems.innerHTML);
  saveCartTotalPrice();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', () => { addToCart(sku); });

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const createProductsList = async () => {
  const api = await fetchProducts('computador');
  api.results.forEach(({ id, title, thumbnail }) => {
    const object = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    productsSection.appendChild(createProductItemElement(object));
  });
  loading.remove();
};

emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.removeItem(cartItems);
  totalPrice.innerHTML = 0;
  localStorage.setItem('cartTotalPrice', 0);
  saveCartItems(cartItems.innerHTML);
});

window.onload = () => {
  createProductsList();
  getSavedCartItems(cartItems, totalPrice);
  getSavedTotalPrice();
  const allCartProducts = document.getElementsByClassName('cart__item');
  Object.values(allCartProducts).forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
};
