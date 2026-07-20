import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatients } from './dashboard-patients';

describe('DashboardPatients', () => {
  let component: DashboardPatients;
  let fixture: ComponentFixture<DashboardPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPatients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
