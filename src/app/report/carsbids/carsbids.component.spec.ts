import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsbidsComponent } from './carsbids.component';

describe('CarsbidComponent', () => {
  let component: CarsbidsComponent;
  let fixture: ComponentFixture<CarsbidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsbidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsbidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
