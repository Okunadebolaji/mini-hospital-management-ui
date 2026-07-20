import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMainDashboard } from './patient-main-dashboard';

describe('PatientMainDashboard', () => {
  let component: PatientMainDashboard;
  let fixture: ComponentFixture<PatientMainDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMainDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMainDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
