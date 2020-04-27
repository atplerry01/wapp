import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeleManagerComponent } from './tele-manager.component';


describe('TeleManagerComponent', () => {
  let component: TeleManagerComponent;
  let fixture: ComponentFixture<TeleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
