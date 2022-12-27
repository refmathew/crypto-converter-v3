import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent implements OnInit {
  currencies = []

  amountToConvert
  symToConvert
  currentLogo


  constructor(
    private rateService: RateService
  ) { }


  ngOnInit(): void {
    this.rateService.init();
    this.rateService._currencies.subscribe(currencies => { 
      this.currencies = currencies 
      this.init(); 
    })
  }

  onChange() {
    this.rateService.convert(this.amountToConvert, this.symToConvert)
    this.changeLogo()
  }

  changeLogo() {
    let currentCurrency = this.currencies.find(currency => currency.sym === this.symToConvert);
    this.currentLogo = currentCurrency.imgUrl
  }

  init() {
    this.amountToConvert = 1;
    this.symToConvert = 'btc';
    this.changeLogo()
    this.onChange()
  }
}