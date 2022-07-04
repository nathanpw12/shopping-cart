const cartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// const getSkuFromProductItem = (item) =>
//   item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const itemID = async (event) => {
  const selectComputer = event.target.parentNode.firstChild.innerText;
  const selectComputerResponse = await fetchItem(selectComputer);
  const productID = createCartItemElement(selectComputerResponse);
  return cartItems.appendChild(productID);
}

const createProductItemElement = ({
  id: sku,
  title: name,
  thumbnail: image,
}) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section
    .appendChild(
      createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    )
    .addEventListener('click', itemID);

  return section;
};

const computersAPI = async () => {
  const response = await fetchProducts('computer');
  const elementHTML = document.querySelector('.items');
  response.results.forEach((computer) => {
    const append = createProductItemElement(computer);
    elementHTML.appendChild(append);
  });
};

window.onload = () => {
  computersAPI();
};
