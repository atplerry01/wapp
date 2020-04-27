import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldCollectorComponent } from './field-collector.component';


describe('FieldCollectorComponent', () => {
  let component: FieldCollectorComponent;
  let fixture: ComponentFixture<FieldCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
