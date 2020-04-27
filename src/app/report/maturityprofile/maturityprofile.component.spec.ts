import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityProfileComponent } from './maturityprofile.component';

describe('PerfmgtComponent', () => {
  let component: MaturityProfileComponent;
  let fixture: ComponentFixture<MaturityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
