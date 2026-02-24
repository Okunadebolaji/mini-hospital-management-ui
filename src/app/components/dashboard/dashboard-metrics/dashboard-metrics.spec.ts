import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMetrics } from './dashboard-metrics';

describe('DashboardMetrics', () => {
  let component: DashboardMetrics;
  let fixture: ComponentFixture<DashboardMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMetrics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMetrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
