require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  
  it('Teste se fetchItem é uma função;', async () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    const retornoFetchItem = await fetchItem('MLB1615760527')
    expect(retornoFetchItem).toBeCalled
  });

  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', async () => {
    const URL = 'https://api.mercadolibre.com/items/MLB1615760527';
    const retornoFetchItem = await fetchItem('MLB1615760527');
    expect(retornoFetchItem).toHaveBeenCalledWith(URL);
  });

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const retornoFetchItem = await fetchItem('MLB1615760527');
    expect(retornoFetchItem).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async() => {
    const retornoFetchItem = await fetchItem();
    expect(retornoFetchItem).toEqual(new Error('You must provide an url'));
  });
});
