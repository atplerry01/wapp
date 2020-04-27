import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAlertComponent } from './expense-alert.component';

describe('ExpenseAlertComponent', () => {
  let component: ExpenseAlertComponent;
  let fixture: ComponentFixture<ExpenseAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
