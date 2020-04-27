import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfmgtComponent } from './perfmgt.component';

describe('PerfmgtComponent', () => {
  let component: PerfmgtComponent;
  let fixture: ComponentFixture<PerfmgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfmgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfmgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
