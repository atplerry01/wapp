import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevpayComponent } from './revpay.component';

describe('RevpayComponent', () => {
  let component: RevpayComponent;
  let fixture: ComponentFixture<RevpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
