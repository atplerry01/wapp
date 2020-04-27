import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMovementComponent } from './channel-movement.component';

describe('ChannelMovementComponent', () => {
  let component: ChannelMovementComponent;
  let fixture: ComponentFixture<ChannelMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
