import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalOfficersComponent } from './principal-officers.component';

describe('PrincipalOfficersComponent', () => {
  let component: PrincipalOfficersComponent;
  let fixture: ComponentFixture<PrincipalOfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalOfficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
