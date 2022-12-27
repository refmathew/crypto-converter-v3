import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  currentCurrency;
  currencies;
  conversions;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
    this.rateService._currentCurrency.subscribe(r => this.currentCurrency = r)
    this.rateService._currencies.subscribe(r => this.currencies = r)
    this.rateService._conversions.subscribe(r => this.conversions = r)
  }
}
