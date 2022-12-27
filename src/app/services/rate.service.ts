import { Injectable, OnChanges, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CryptoCurrency, FiatCurrency } from '../classes/currency';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RateService{
  private cryptoList: Array<string> = ['bitcoin', 'ethereum', 'binancecoin', 'axie-infinity', 'plant-vs-undead-token'];
  private fiatList: Array<string> = ['php', 'usd'];
  private apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${this.cryptoList.join(",")}&vs_currencies=${this.fiatList.join(",")}`

  private axieInfinity;
  private binancecoin;
  private bitcoin;
  private ethereum;
  private plantVsUndeadToken;
  private usDollar;
  private phPeso;
  private cryptoCurrencies = [];

  public _currencies = new BehaviorSubject([]);
  public _currentCurrency = new BehaviorSubject('btc');
  public _conversions = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  init(){
    this.http.get<Response>(this.apiUrl).subscribe(response => { 
      this.setCryptoToFiat(response);
      this.cryptoCurrencies.push(this.axieInfinity, this.binancecoin, this.bitcoin, this.ethereum, this.plantVsUndeadToken)
      this.setCryptoToCrypto();
      this.setFiat();
      this._currencies.next([ this.axieInfinity, this.binancecoin, this.bitcoin, this.ethereum, this.plantVsUndeadToken, this.usDollar, this.phPeso ]);
    })
  }

  convert(amount, sym) {
    let currentCurrency = this._currencies.getValue().find(currency => currency['sym'] === sym);
    this._conversions.next(currentCurrency.getConversion(amount));

    this._currentCurrency.next(sym);
  }

  private setCryptoToFiat(response) {
    this.axieInfinity = new CryptoCurrency('Axie Infinity', 'axs', 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082', response['axie-infinity']['usd'], response['axie-infinity']['php'])
    this.binancecoin = new CryptoCurrency('Binance Coin', 'bnb', 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850', response['binancecoin']['usd'], response['binancecoin']['php'])
    this.bitcoin = new CryptoCurrency('Bitcoin', 'btc', 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579', response['bitcoin']['usd'], response['bitcoin']['php'])
    this.ethereum = new CryptoCurrency('Ethereum', 'eth', 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', response['ethereum']['usd'], response['ethereum']['php'])
    this.plantVsUndeadToken = new CryptoCurrency('Plant vs Undead Token', 'pvu', 'https://assets.coingecko.com/coins/images/17461/small/token-200x200.png?1627883446', response['plant-vs-undead-token']['usd'], response['plant-vs-undead-token']['php'])
  }

  private setCryptoToCrypto() {
    this.cryptoCurrencies.forEach(( currency ) => {
      currency.setCryptoRates(this.cryptoCurrencies);
    }) 
  }

  private setFiat() {
    this.usDollar = new FiatCurrency('US Dollar', 'usd', 'https://wise.com/public-resources/assets/flags/rectangle/usd.png')
    this.phPeso = new FiatCurrency('PH Peso', 'php', 'https://wise.com/public-resources/assets/flags/rectangle/php.png')
    this.usDollar.setCryptoRates(this.cryptoCurrencies);
    this.phPeso.setCryptoRates(this.cryptoCurrencies);
  }
}
