import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountEnquiryComponent } from './my-account-enquiry.component';

describe('AccountEnquiryComponent', () => {
  let component: MyAccountEnquiryComponent;
  let fixture: ComponentFixture<MyAccountEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
