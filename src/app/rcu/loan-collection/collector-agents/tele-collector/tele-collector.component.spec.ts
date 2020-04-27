import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeleCollectorComponent } from './tele-collector.component';


describe('TeleCollectorComponent', () => {
  let component: TeleCollectorComponent;
  let fixture: ComponentFixture<TeleCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
