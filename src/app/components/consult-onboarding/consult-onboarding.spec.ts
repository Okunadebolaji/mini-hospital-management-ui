import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOnboarding } from './consult-onboarding';

describe('ConsultOnboarding', () => {
  let component: ConsultOnboarding;
  let fixture: ComponentFixture<ConsultOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
