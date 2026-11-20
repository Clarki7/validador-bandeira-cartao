const test = require('node:test');
const assert = require('node:assert/strict');
const { validarCartao, identificarBandeira, luhn, mascarar } = require('../src/index.js');

// Números de TESTE públicos (não são cartões reais).
const validos = {
  Visa: ['4111111111111111', '4012888888881881'],
  Mastercard: ['5555555555554444', '2223003122003222'],
  'American Express': ['378282246310005'],
  'Diners Club': ['30569309025904'],
  Discover: ['6011111111111117'],
  JCB: ['3530111333300000'],
  Elo: ['6362970000457013'],
  Hipercard: ['6062825624254001'],
};

for (const [bandeira, numeros] of Object.entries(validos)) {
  for (const n of numeros) {
    test(`${bandeira} ${n} é válido`, () => {
      assert.deepEqual(validarCartao(n), { valido: true, bandeira, motivo: null });
    });
  }
}

test('aceita espaços e traços', () => {
  assert.equal(validarCartao('4111 1111-1111 1111').valido, true);
});

test('recusa número que falha no Luhn', () => {
  const r = validarCartao('4111111111111112');
  assert.equal(r.valido, false);
  assert.equal(r.bandeira, 'Visa');
});

test('recusa tamanho errado para a bandeira', () => {
  assert.equal(validarCartao('37828224631000').valido, false);
});

test('recusa bandeira desconhecida', () => {
  assert.equal(validarCartao('9999999999999995').bandeira, null);
});

test('recusa entrada vazia', () => {
  assert.equal(validarCartao('').valido, false);
});

test('identifica bandeira só pelo prefixo', () => {
  assert.equal(identificarBandeira('506720'), 'Elo');
  assert.equal(identificarBandeira('4'), 'Visa');
});

test('luhn básico', () => {
  assert.equal(luhn('79927398713'), true);
  assert.equal(luhn('79927398710'), false);
});

test('mascara o número', () => {
  assert.equal(mascarar('4111111111111111'), '4111 •••• •••• 1111');
});
