import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBorrowerComponent } from './corporate-borrower.component';

describe('CorporateBorrowerComponent', () => {
  let component: CorporateBorrowerComponent;
  let fixture: ComponentFixture<CorporateBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
