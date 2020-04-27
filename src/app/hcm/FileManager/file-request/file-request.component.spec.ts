import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRequestComponent } from './file-request.component';

describe('FileRequestComponent', () => {
  let component: FileRequestComponent;
  let fixture: ComponentFixture<FileRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
