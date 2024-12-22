import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDialogButtonComponent } from './transaction-dialog-button.component';

describe('TransactionDialogButtonComponent', () => {
  let component: TransactionDialogButtonComponent;
  let fixture: ComponentFixture<TransactionDialogButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDialogButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
