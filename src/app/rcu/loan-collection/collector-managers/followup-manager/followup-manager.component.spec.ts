import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FollowupManagerComponent } from './followup-manager.component';


describe('FollowupManagerComponent', () => {
  let component: FollowupManagerComponent;
  let fixture: ComponentFixture<FollowupManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
