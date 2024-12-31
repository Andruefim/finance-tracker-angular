import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCategoriesComponent } from './base-categories.component';

describe('BaseCategoriesComponent', () => {
  let component: BaseCategoriesComponent;
  let fixture: ComponentFixture<BaseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
