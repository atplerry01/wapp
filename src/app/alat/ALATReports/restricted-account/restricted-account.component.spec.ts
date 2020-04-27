import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAccountComponent } from './restricted-account.component';

describe('RestrictedAccountComponent', () => {
  let component: RestrictedAccountComponent;
  let fixture: ComponentFixture<RestrictedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
