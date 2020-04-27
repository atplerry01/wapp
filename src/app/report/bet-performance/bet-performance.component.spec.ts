import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetPerformanceComponent } from './bet-performance.component';

describe('BetPerformanceComponent', () => {
  let component: BetPerformanceComponent;
  let fixture: ComponentFixture<BetPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
