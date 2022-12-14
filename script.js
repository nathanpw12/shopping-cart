const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items'); 

const loading = () => {
  const element = document.createElement('div');
  element.innerHTML = 'carregando...';
  element.classList.add('loading');
  items.appendChild(element);
};

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
  cartItems.appendChild(productID);
  saveCartItems(cartItems.innerHTML);
};

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
  const loadingComputers = document.querySelector('.loading');
  const response = await fetchProducts('computer');
  loadingComputers.remove();
  const elementHTML = document.querySelector('.items');
  response.results.forEach((computer) => {
    const append = createProductItemElement(computer);
    elementHTML.appendChild(append);
  });
};

const itemRemove = () => {
  const itemRemoveBtn = document.querySelector('.empty-cart');
  itemRemoveBtn.addEventListener('click', () => {
    cartItems.innerHTML = ' ';
    localStorage.clear();
  });
};

const orginalCart = () => {
  const list = getSavedCartItems();
  cartItems.innerHTML = list;
};
//
const delOriginalCart = () => {
  const cartItemsChilds = document.querySelector('.cart__items').childNodes;
  cartItemsChilds.forEach((element) => element.addEventListener('click', (event) => {
    event.target.remove();
    saveCartItems(cartItems.innerHTML);
  }));
};

window.onload = () => {
  loading();
  computersAPI();
  itemRemove();
  orginalCart();
  delOriginalCart();
};
