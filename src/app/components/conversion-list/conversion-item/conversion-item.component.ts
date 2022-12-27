import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-conversion-item',
  templateUrl: './conversion-item.component.html',
  styleUrls: ['./conversion-item.component.scss']
})
export class ConversionItemComponent implements OnInit {
  private _currency;
  public currentCurrency;
  private conversions;

  @Input() 
  set currency(currency) { this._currency = currency.value };
  get currency() { return this._currency };

  constructor(private rateService: RateService) { }

  ngOnInit(): void { 
    this.rateService._conversions.subscribe(r => { 
      this.conversions = r;

      for (const conversion in this.conversions) {
        if (conversion === this.currency['sym']){
          this.currency.conversion = this.conversions[conversion]; 
        }
      }  
    });
  
    this.rateService._currentCurrency.subscribe(r => this.currentCurrency = r);
  }
}
