import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FimiFileuploadComponent } from './fimi-fileupload.component';

describe('FimiFileuploadComponent', () => {
  let component: FimiFileuploadComponent;
  let fixture: ComponentFixture<FimiFileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FimiFileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FimiFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
