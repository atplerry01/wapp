import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeDebitComponent } from './firsttime-debit.component';

describe('FirstTimeDebitComponent', () => {
  let component: FirstTimeDebitComponent;
  let fixture: ComponentFixture<FirstTimeDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
