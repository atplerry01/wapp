import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMChangeComponent } from './crmchange.component';

describe('CRMChangeComponent', () => {
  let component: CRMChangeComponent;
  let fixture: ComponentFixture<CRMChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRMChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
