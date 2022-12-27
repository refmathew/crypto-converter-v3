import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { WrapperComponent } from './components/conversion-list/wrapper/wrapper.component';
import { ConversionItemComponent } from './components/conversion-list/conversion-item/conversion-item.component';
import { CurrencyListWrapperComponent } from './components/currency-list/currency-list-wrapper/currency-list-wrapper.component';
import { CurrencyListItemComponent } from './components/currency-list/currency-list-item/currency-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    HeaderComponent,
    WrapperComponent,
    ConversionItemComponent,
    CurrencyListWrapperComponent,
    CurrencyListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
