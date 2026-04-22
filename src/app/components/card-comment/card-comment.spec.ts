import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComment } from './card-comment';

describe('CardComment', () => {
  let component: CardComment;
  let fixture: ComponentFixture<CardComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComment],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
