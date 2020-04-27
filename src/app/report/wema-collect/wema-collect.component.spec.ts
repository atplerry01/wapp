import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WemaCollectComponent } from './wema-collect.component';

describe('PerfmgtComponent', () => {
  let component: WemaCollectComponent;
  let fixture: ComponentFixture<WemaCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WemaCollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WemaCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
