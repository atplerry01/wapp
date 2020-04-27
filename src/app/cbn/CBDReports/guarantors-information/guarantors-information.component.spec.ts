import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorsInformationComponent } from './guarantors-information.component';

describe('GuarantorsInformationComponent', () => {
  let component: GuarantorsInformationComponent;
  let fixture: ComponentFixture<GuarantorsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
