import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDashboard } from './consult-dashboard';

describe('ConsultDashboard', () => {
  let component: ConsultDashboard;
  let fixture: ComponentFixture<ConsultDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
