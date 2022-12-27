import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListWrapperComponent } from './currency-list-wrapper.component';

describe('CurrencyListWrapperComponent', () => {
  let component: CurrencyListWrapperComponent;
  let fixture: ComponentFixture<CurrencyListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyListWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
