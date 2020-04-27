import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NipInbranchComponent } from './nip-inbranch.component';

describe('NipInbranchComponent', () => {
  let component: NipInbranchComponent;
  let fixture: ComponentFixture<NipInbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NipInbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NipInbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
