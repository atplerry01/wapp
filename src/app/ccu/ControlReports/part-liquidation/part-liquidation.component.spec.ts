import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartLiquidationComponent } from './part-liquidation.component';

describe('PartLiquidationComponent', () => {
  let component: PartLiquidationComponent;
  let fixture: ComponentFixture<PartLiquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartLiquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
