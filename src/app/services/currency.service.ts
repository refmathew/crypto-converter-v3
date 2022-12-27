import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _blacklist = []
  public _blacklist$ = new BehaviorSubject([]);

  constructor() { }

  addToBlacklist (sym: string) {
    if (this._blacklist.indexOf(sym) === -1) this._blacklist.push(sym);
    this._blacklist$.next(this._blacklist);
  }

  removeFromBlacklist (sym: string) {
    if (this._blacklist.indexOf(sym) !== -1) this._blacklist.splice(this._blacklist.indexOf(sym), 1);
    this._blacklist$.next(this._blacklist);
  }
}
