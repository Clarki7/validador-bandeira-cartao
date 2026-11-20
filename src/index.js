/**
 * Validador de bandeira de cartão de crédito.
 *
 * Identifica a bandeira pelo prefixo (BIN), confere a quantidade de dígitos
 * e valida o número com o algoritmo de Luhn.
 *
 * Funciona no Node.js (require/import) e direto no navegador (window.ValidadorCartao).
 */
(function (global) {
  'use strict';

  /**
   * Bandeiras na ordem de verificação.
   * Elo, Hipercard e Aura vêm antes de Visa/Mastercard porque alguns
   * prefixos se sobrepõem.
   */
  const BANDEIRAS = [
    {
      nome: 'Elo',
      prefixo: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
      tamanhos: [16],
    },
    { nome: 'Hipercard', prefixo: /^(606282|3841(0|4|6)0)/, tamanhos: [13, 16, 19] },
    { nome: 'American Express', prefixo: /^3[47]/, tamanhos: [15] },
    { nome: 'Diners Club', prefixo: /^3(0[0-5]|[68])/, tamanhos: [14, 16] },
    { nome: 'JCB', prefixo: /^35(2[89]|[3-8])/, tamanhos: [16, 17, 18, 19] },
    { nome: 'Discover', prefixo: /^6(011|5)/, tamanhos: [16, 19] },
    { nome: 'Mastercard', prefixo: /^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/, tamanhos: [16] },
    { nome: 'Visa', prefixo: /^4/, tamanhos: [13, 16, 19] },
    { nome: 'Aura', prefixo: /^50/, tamanhos: [16, 17, 18, 19] },
  ];

  /** Remove espaços, pontos, traços e qualquer caractere que não seja dígito. */
  function limpar(numero) {
    return String(numero ?? '').replace(/\D/g, '');
  }

  /** Algoritmo de Luhn (mod 10): detecta erros de digitação. */
  function luhn(digitos) {
    let soma = 0;
    let dobrar = false;
    for (let i = digitos.length - 1; i >= 0; i--) {
      let d = Number(digitos[i]);
      if (dobrar) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      soma += d;
      dobrar = !dobrar;
    }
    return digitos.length > 0 && soma % 10 === 0;
  }

  /** Retorna o nome da bandeira pelo prefixo, ou null. */
  function identificarBandeira(numero) {
    const digitos = limpar(numero);
    const bandeira = BANDEIRAS.find((b) => b.prefixo.test(digitos));
    return bandeira ? bandeira.nome : null;
  }

  /**
   * Valida o número completo.
   * @param {string|number} numero número do cartão (aceita espaços e traços)
   * @returns {{valido: boolean, bandeira: string|null, motivo: string|null}}
   */
  function validarCartao(numero) {
    const digitos = limpar(numero);

    if (digitos.length < 12 || digitos.length > 19) {
      return { valido: false, bandeira: identificarBandeira(digitos), motivo: 'Quantidade de dígitos inválida' };
    }

    const bandeira = BANDEIRAS.find((b) => b.prefixo.test(digitos));
    if (!bandeira) {
      return { valido: false, bandeira: null, motivo: 'Bandeira não reconhecida' };
    }
    if (!bandeira.tamanhos.includes(digitos.length)) {
      return { valido: false, bandeira: bandeira.nome, motivo: `${bandeira.nome} não usa ${digitos.length} dígitos` };
    }
    if (!luhn(digitos)) {
      return { valido: false, bandeira: bandeira.nome, motivo: 'Número não passa na verificação de Luhn' };
    }
    return { valido: true, bandeira: bandeira.nome, motivo: null };
  }

  /** Mascara o número para exibição: 4111 •••• •••• 1111 */
  function mascarar(numero) {
    const d = limpar(numero);
    if (d.length < 8) return d;
    const meio = d.slice(4, -4).replace(/\d/g, '•');
    return (d.slice(0, 4) + meio + d.slice(-4)).replace(/(.{4})/g, '$1 ').trim();
  }

  const api = { validarCartao, identificarBandeira, luhn, limpar, mascarar, BANDEIRAS };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.ValidadorCartao = api;
  }

  // Uso pela linha de comando: node src/index.js 4111111111111111
  if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
    const entrada = process.argv.slice(2).join('');
    if (!entrada) {
      console.log('Uso: node src/index.js <número do cartão>');
      process.exit(1);
    }
    const r = validarCartao(entrada);
    console.log(`${mascarar(entrada)} → ${r.bandeira ?? 'desconhecida'} · ${r.valido ? 'válido ✅' : 'inválido ❌ (' + r.motivo + ')'}`);
  }
})(typeof window !== 'undefined' ? window : globalThis);
