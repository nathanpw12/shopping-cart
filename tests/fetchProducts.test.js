require('../mocks/fetchSimulator');
const { type } = require('mocha/lib/utils');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  
  it('Teste se fetchProducts é uma função.', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  it('Se a função fetchProducts ter como argumento "computador", teste se fetch foi chamada', () => {
    expect(fetchProducts('computador')).toBeCalled; 
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(URL);
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const retornoFetchProducts = await fetchProducts('computador');
    expect(retornoFetchProducts).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async() => {
    const retornoFetchProducts = await fetchProducts();
    expect(retornoFetchProducts).toEqual(new Error('You must provide an url'));
  });
});
