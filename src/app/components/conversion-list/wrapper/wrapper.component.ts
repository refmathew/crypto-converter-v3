import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  currencies;
  conversions;
  blacklist;

  constructor(
    private rateService: RateService, 
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.rateService._currencies.subscribe(r => this.currencies = r);
    this.rateService._conversions.subscribe(r => this.conversions = r);
    this.currencyService._blacklist$.subscribe(r => this.blacklist = r);
  }

  isOnBlacklist(sym) {
    return this.blacklist.find(item => item === sym);
  }
}
