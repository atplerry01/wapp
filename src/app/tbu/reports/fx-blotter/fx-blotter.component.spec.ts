import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxBlotterComponent } from './fx-blotter.component';

describe('FxBlotterComponent', () => {
  let component: FxBlotterComponent;
  let fixture: ComponentFixture<FxBlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxBlotterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
