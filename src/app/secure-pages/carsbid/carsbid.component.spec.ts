import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsbidComponent } from './carsbid.component';

describe('CarsbidComponent', () => {
  let component: CarsbidComponent;
  let fixture: ComponentFixture<CarsbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
