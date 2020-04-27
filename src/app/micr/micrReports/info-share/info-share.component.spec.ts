import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoShareComponent } from './info-share.component';

describe('InfoShareComponent', () => {
  let component: InfoShareComponent;
  let fixture: ComponentFixture<InfoShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
