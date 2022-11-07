require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  beforeEach(async () => received = await fetchItem('MLB1615760527'));

  test('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', () => {
    expect(received).toMatchObject(item);
  });

  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const reject = await fetchItem();
    expect(() => {throw reject}).toThrow('You must provide an url');
  });
});
