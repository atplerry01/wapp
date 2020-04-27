import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPortalComponent } from './audit-portal.component';

describe('AuditPortalComponent', () => {
  let component: AuditPortalComponent;
  let fixture: ComponentFixture<AuditPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
