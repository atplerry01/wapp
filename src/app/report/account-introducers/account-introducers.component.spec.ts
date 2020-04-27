import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIntroducerComponent } from './account-introducers.component';

describe('PerfmgtComponent', () => {
  let component: AccountIntroducerComponent;
  let fixture: ComponentFixture<AccountIntroducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountIntroducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIntroducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
