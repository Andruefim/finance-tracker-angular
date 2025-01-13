import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDialogButtonComponent } from './edit-category-dialog-button.component';

describe('EditCategoryDialogButtonComponent', () => {
  let component: EditCategoryDialogButtonComponent;
  let fixture: ComponentFixture<EditCategoryDialogButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryDialogButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
