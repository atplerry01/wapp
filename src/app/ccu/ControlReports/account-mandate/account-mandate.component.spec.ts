import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMandateComponent } from './account-mandate.component';

describe('AccountMandateComponent', () => {
  let component: AccountMandateComponent;
  let fixture: ComponentFixture<AccountMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
