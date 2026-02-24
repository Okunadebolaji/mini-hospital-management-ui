import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GynDashboardComponent } from './gyn-dashboard';

describe('GynDashboard', () => {
  let component: GynDashboardComponent;
  let fixture: ComponentFixture<GynDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GynDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GynDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
