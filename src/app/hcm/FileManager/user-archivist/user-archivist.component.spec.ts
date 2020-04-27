import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArchivistComponent } from './user-archivist.component';

describe('UserArchivistComponent', () => {
  let component: UserArchivistComponent;
  let fixture: ComponentFixture<UserArchivistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserArchivistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArchivistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
