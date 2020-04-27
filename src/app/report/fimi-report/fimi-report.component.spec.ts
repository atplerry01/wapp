import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FimiReportComponent } from './fimi-report.component';

describe('FimiReportComponent', () => {
  let component: FimiReportComponent;
  let fixture: ComponentFixture<FimiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FimiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FimiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
