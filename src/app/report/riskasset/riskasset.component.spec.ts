import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskassetComponent } from './riskasset.component';

describe('RiskassetComponent', () => {
  let component: RiskassetComponent;
  let fixture: ComponentFixture<RiskassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
