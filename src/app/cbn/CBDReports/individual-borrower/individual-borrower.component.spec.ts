import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBorrowerComponent } from './individual-borrower.component';

describe('IndividualBorrowerComponent', () => {
  let component: IndividualBorrowerComponent;
  let fixture: ComponentFixture<IndividualBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
