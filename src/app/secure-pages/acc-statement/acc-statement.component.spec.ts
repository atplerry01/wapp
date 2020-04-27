import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccStatementComponent } from './acc-statement.component';

describe('AccStatementComponent', () => {
  let component: AccStatementComponent;
  let fixture: ComponentFixture<AccStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
