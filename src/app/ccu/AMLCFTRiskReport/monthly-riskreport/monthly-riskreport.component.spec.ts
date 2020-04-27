
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyRiskreportComponent } from './monthly-riskreport.component';

describe('MonthlyRiskreportComponent', () => {
  let component: MonthlyRiskreportComponent;
  let fixture: ComponentFixture<MonthlyRiskreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyRiskreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRiskreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
