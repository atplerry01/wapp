import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryLimitComponent } from './regulatory-limit.component';

describe('RegulatoryLimitComponent', () => {
  let component: RegulatoryLimitComponent;
  let fixture: ComponentFixture<RegulatoryLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatoryLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
