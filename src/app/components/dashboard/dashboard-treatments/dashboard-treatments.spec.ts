import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTreatments } from './dashboard-treatments';

describe('DashboardTreatments', () => {
  let component: DashboardTreatments;
  let fixture: ComponentFixture<DashboardTreatments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTreatments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTreatments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
