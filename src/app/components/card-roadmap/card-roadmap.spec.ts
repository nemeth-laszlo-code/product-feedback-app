import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoadmap } from './card-roadmap';

describe('CardRoadmap', () => {
  let component: CardRoadmap;
  let fixture: ComponentFixture<CardRoadmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRoadmap],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRoadmap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
