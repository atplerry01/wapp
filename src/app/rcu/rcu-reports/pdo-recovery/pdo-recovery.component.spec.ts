import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdoRecoveryComponent } from './pdo-recovery.component';

describe('PdoRecoveryComponent', () => {
  let component: PdoRecoveryComponent;
  let fixture: ComponentFixture<PdoRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdoRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdoRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
