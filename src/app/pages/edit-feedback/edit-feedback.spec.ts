import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeedback } from './edit-feedback';

describe('EditFeedback', () => {
  let component: EditFeedback;
  let fixture: ComponentFixture<EditFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFeedback],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
