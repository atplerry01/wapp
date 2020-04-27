import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRactivationComponent } from './account-ractivation.component';

describe('AccountRactivationComponent', () => {
  let component: AccountRactivationComponent;
  let fixture: ComponentFixture<AccountRactivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRactivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
