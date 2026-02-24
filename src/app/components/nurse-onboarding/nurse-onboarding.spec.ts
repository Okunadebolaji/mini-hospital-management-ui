import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseOnboarding } from './nurse-onboarding';

describe('NurseOnboarding', () => {
  let component: NurseOnboarding;
  let fixture: ComponentFixture<NurseOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
