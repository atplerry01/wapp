import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccstatsComponent } from './accstats.component';

describe('AccstatsComponent', () => {
  let component: AccstatsComponent;
  let fixture: ComponentFixture<AccstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
