import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitNotificationComponent } from './limit-notification.component';

describe('PerfmgtComponent', () => {
  let component: LimitNotificationComponent;
  let fixture: ComponentFixture<LimitNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
