import { TestBed } from '@angular/core/testing';

import { PatientAdmissionService } from './patient-admission';


describe('PatientAdmission', () => {
  let service: PatientAdmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientAdmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
