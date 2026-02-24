import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GynOnboarding } from './gyn-onboarding';

describe('GynOnboarding', () => {
  let component: GynOnboarding;
  let fixture: ComponentFixture<GynOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GynOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GynOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
