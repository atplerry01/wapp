import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssetsComponent } from './risk-assets.component';

describe('RiskAssetsComponent', () => {
  let component: RiskAssetsComponent;
  let fixture: ComponentFixture<RiskAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
