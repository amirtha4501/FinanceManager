import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedTransactionComponent } from './planned-transaction.component';

describe('PlannedTransactionComponent', () => {
  let component: PlannedTransactionComponent;
  let fixture: ComponentFixture<PlannedTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
