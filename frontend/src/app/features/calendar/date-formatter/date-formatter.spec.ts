import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormatter } from './date-formatter';

describe('DateFormatter', () => {
  let component: DateFormatter;
  let fixture: ComponentFixture<DateFormatter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFormatter],
    }).compileComponents();

    fixture = TestBed.createComponent(DateFormatter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
