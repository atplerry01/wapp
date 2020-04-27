import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDepositorsComponent } from './top-depositors.component';

describe('TopDepositorsComponent', () => {
  let component: TopDepositorsComponent;
  let fixture: ComponentFixture<TopDepositorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDepositorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDepositorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
