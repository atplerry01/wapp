import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienAccountComponent } from './lien-account.component';

describe('LienAccountComponent', () => {
  let component: LienAccountComponent;
  let fixture: ComponentFixture<LienAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
