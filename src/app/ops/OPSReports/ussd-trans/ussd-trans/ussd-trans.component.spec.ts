import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdTransComponent } from './ussd-trans.component';

describe('UssdTransComponent', () => {
  let component: UssdTransComponent;
  let fixture: ComponentFixture<UssdTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
