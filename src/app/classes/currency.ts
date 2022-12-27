abstract class Currency {
    private rates: Object = {};

    constructor(
        public name: string,
        public sym: string,
        public imgUrl: string) { }

    getConversion(amount: number){
        let conversions: Object = {...this.rates}
        for (const rate in this['rates']) {
            // conversions[rate] = ( ((conversions[rate] * amount) * 100000000) / 100000000).toFixed(8);
            conversions[rate] = conversions[rate] * amount;
        }
        return conversions;
    }
}

export class CryptoCurrency extends Currency {
    public reversedRates: Object = {};

    constructor( 
       name: string, 
       sym: string, 
       imgUrl: string,
       usd: number, 
       php: number ) {
        
       super(name, sym, imgUrl)

       // Rate of 1 php, usd to crypto
       this['reversedRates']['php'] = 1 / php
       this['reversedRates']['usd'] = 1 / usd

       // Rate of 1 crypto to php, usd
       this['rates']['php'] = php
       this['rates']['usd'] = usd
   }

   setCryptoRates(cryptoCurrencies) {
       cryptoCurrencies.forEach((cryptoCurrency) => {
            if (cryptoCurrency['sym'] !== this['sym']) {
                this['rates'][cryptoCurrency['sym']] = cryptoCurrency['reversedRates']['php'] / this['reversedRates']['php'];
            }
       })
   }
}

export class FiatCurrency extends Currency {

    constructor( name: string, sym: string, imgUrl: string ) {
        super(name, sym, imgUrl)
    }

    setCryptoRates(cryptoCurrencies) {
        cryptoCurrencies.forEach((cryptoCurrency) => {
            this['rates'][cryptoCurrency['sym']] = cryptoCurrency['reversedRates'][this.sym];

            this.setFiatRate(cryptoCurrency)
        })
    }

    private setFiatRate( cryptoCurrency) {
        if (cryptoCurrency['sym'] === 'btc') {
            if (this['sym'] === 'usd') {
                this['rates']['php'] = cryptoCurrency['rates']['php'] / cryptoCurrency['rates']['usd'];
            } else {
                this['rates']['usd'] = cryptoCurrency['rates']['usd'] / cryptoCurrency['rates']['php'];
            }
        }
    }
}