import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedback } from './new-feedback';

describe('NewFeedback', () => {
  let component: NewFeedback;
  let fixture: ComponentFixture<NewFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFeedback],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
