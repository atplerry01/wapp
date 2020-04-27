import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNetworkComponent } from './branch-network.component';

describe('BranchNetworkComponent', () => {
  let component: BranchNetworkComponent;
  let fixture: ComponentFixture<BranchNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
