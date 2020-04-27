import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbillsComponent } from './ebills.component';

describe('EbillsComponent', () => {
  let component: EbillsComponent;
  let fixture: ComponentFixture<EbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
