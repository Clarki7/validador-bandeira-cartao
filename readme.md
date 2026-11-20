<div align="center">

# 💳 Validador de Bandeira de Cartão

Identifica a **bandeira** de um cartão de crédito e confere se o número é **válido** com o algoritmo de Luhn. Tudo em JavaScript puro, sem dependências.

[![Testes](https://github.com/Clarki7/validador-bandeira-cartao/actions/workflows/test.yml/badge.svg)](https://github.com/Clarki7/validador-bandeira-cartao/actions/workflows/test.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=flat-square)

**[▶️ Testar no navegador](https://clarki7.github.io/validador-bandeira-cartao/)**

</div>

---

## ✨ O que ele faz

- 🔎 Identifica a bandeira pelo prefixo do número (BIN)
- 📏 Confere se a quantidade de dígitos bate com a bandeira
- ✅ Valida o número com o **algoritmo de Luhn**, que pega erros de digitação
- 🇧🇷 Reconhece bandeiras brasileiras: **Elo**, **Hipercard** e **Aura**
- 🧹 Aceita o número com espaços, pontos ou traços
- 🔒 Roda 100% local: nenhum número é enviado ou guardado

### Bandeiras suportadas

| Bandeira | Começa com | Dígitos |
|:--|:--|:--:|
| Visa | 4 | 13, 16, 19 |
| Mastercard | 51–55, 2221–2720 | 16 |
| American Express | 34, 37 | 15 |
| Elo | 4011, 4312, 4389, 5041, 5066, 5067, 509, 6277, 6362, 6363, 650, 6516, 6550 | 16 |
| Hipercard | 606282, 3841 | 13, 16, 19 |
| Diners Club | 300–305, 36, 38 | 14, 16 |
| Discover | 6011, 65 | 16, 19 |
| JCB | 3528–3589 | 16–19 |
| Aura | 50 | 16–19 |

## 🚀 Como usar

### No navegador

Abra o `index.html` ou use a [versão online](https://clarki7.github.io/validador-bandeira-cartao/). O cartão muda de cor conforme você digita: verde para válido, vermelho para inválido.

### Na linha de comando

```bash
node src/index.js 4111 1111 1111 1111
# 4111 •••• •••• 1111 → Visa · válido ✅
```

### No seu código

```js
const { validarCartao, identificarBandeira } = require('./src/index.js');

validarCartao('5555 5555 5555 4444');
// { valido: true, bandeira: 'Mastercard', motivo: null }

validarCartao('4111111111111112');
// { valido: false, bandeira: 'Visa', motivo: 'Número não passa na verificação de Luhn' }

identificarBandeira('6362970000457013'); // 'Elo'
```

## 🧪 Testes

```bash
npm test
```

Os testes usam o `node:test` nativo, sem instalar nada, e rodam automaticamente no GitHub Actions a cada push.

## 🧠 Como funciona o algoritmo de Luhn

1. Da direita para a esquerda, dobre um dígito sim, um não.
2. Se o dobro passar de 9, subtraia 9.
3. Some tudo. Se o total for múltiplo de 10, o número é válido.

> ⚠️ Um número "válido" aqui só quer dizer que ele é bem formado. Isso **não** significa que o cartão existe ou tem saldo. Use apenas números de teste.

## 📁 Estrutura

```
├── index.html          # página de demonstração
├── src/index.js        # validador (Node + navegador)
├── test/index.test.js  # testes
└── Assets/             # imagens
```

## 📜 Histórico

A versão 1 começou como exercício de estudo, a partir de um exemplo de expressões regulares. A versão 2 foi reescrita do zero, com Luhn, bandeiras brasileiras, testes e página de demonstração.

---

<div align="center">
Feito por <a href="https://github.com/Clarki7">Benjamin Clark</a> · Licença MIT
</div>
