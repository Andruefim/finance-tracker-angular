import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryDialogButtonComponent } from './add-category-dialog-button.component';

describe('AddCategoryDialogButtonComponent', () => {
  let component: AddCategoryDialogButtonComponent;
  let fixture: ComponentFixture<AddCategoryDialogButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryDialogButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
