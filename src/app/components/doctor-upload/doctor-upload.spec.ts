import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpload } from './doctor-upload';

describe('DoctorUpload', () => {
  let component: DoctorUpload;
  let fixture: ComponentFixture<DoctorUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
