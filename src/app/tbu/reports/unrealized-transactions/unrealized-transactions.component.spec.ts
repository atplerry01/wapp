import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrealizedTransactionsComponent } from './unrealized-transactions.component';

describe('UnrealizedTransactionsComponent', () => {
  let component: UnrealizedTransactionsComponent;
  let fixture: ComponentFixture<UnrealizedTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnrealizedTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnrealizedTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
