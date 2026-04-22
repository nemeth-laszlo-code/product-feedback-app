import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuggestion } from './card-suggestion';

describe('CardSuggestion', () => {
  let component: CardSuggestion;
  let fixture: ComponentFixture<CardSuggestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSuggestion],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSuggestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
