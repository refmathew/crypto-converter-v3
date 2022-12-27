import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-list-item',
  templateUrl: './currency-list-item.component.html',
  styleUrls: ['./currency-list-item.component.scss']
})
export class CurrencyListItemComponent implements OnInit {
  _currency;

  @Input() 
  set currency(currency) { this._currency = currency.value };
  get currency() { return this._currency };

  constructor(private currencyService: CurrencyService ) { }

  ngOnInit(): void {
  }

  onAddButtonClick(sym) {
    this.currencyService.removeFromBlacklist(sym);
  }
}
