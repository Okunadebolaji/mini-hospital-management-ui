import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAssignedPatients } from './doctor-assigned-patients';

describe('DoctorAssignedPatients', () => {
  let component: DoctorAssignedPatients;
  let fixture: ComponentFixture<DoctorAssignedPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAssignedPatients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAssignedPatients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
