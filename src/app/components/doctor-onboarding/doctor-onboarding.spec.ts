import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOnboarding } from './doctor-onboarding';

describe('DoctorOnboarding', () => {
  let component: DoctorOnboarding;
  let fixture: ComponentFixture<DoctorOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
