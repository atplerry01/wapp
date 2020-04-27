import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOverComponent } from './call-over.component';

describe('PerfmgtComponent', () => {
  let component: CallOverComponent;
  let fixture: ComponentFixture<CallOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
