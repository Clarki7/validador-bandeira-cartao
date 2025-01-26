var tgdeveloper = {

    /**
    * getCardFlag
    * Return card flag by number
    *
    * @param cardnumber
    */
    getCardFlag: function(cardnumber) {
        var cardnumber = cardnumber.replace(/[^0-9]+/g, '');

        var cards = {
            'Master Card'      : /^5[1-5][0-9]{14}$/,
            Visa               : /^4[0-9]{12}(?:[0-9]{3})$/,    
            'American Express' : /^3[47][0-9]{13}$/,     
            'Diners Club'      : /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            Discover           : /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            EnRoute            : /^(2014|2149)\d{11}$/,
            JCB                : /^(?:2131|1800|35\d{3})\d{11}$/,
            Voyager            : /^8699\d{11}$/,
            'Hiper Card'       : /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
            Aura               : /^((?!504175))^((?!5067))(^50[0-9])/
        };

        for (var flag in cards) {
            if(cards[flag].test(cardnumber)) {
                return { valid: true, bandeira: flag };
            }
        }

        return { valid: false, bandeira: 'null' };
    }

}

// Exemplo de uso
const cardNumber = '375320139147967'; // número de teste válido para Visa
const cardFlag = tgdeveloper.getCardFlag(cardNumber);
console.log(cardFlag);