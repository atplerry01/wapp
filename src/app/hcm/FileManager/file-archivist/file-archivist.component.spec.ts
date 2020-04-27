import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileArchivistComponent } from './file-archivist.component';

describe('FileArchivistComponent', () => {
  let component: FileArchivistComponent;
  let fixture: ComponentFixture<FileArchivistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileArchivistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileArchivistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
