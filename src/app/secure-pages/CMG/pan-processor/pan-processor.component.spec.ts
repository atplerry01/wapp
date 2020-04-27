import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanProcessorComponent } from './pan-processor.component';

describe('PanProcessorComponent', () => {
  let component: PanProcessorComponent;
  let fixture: ComponentFixture<PanProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
