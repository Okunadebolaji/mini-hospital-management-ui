import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeDashboard } from './eye-dashboard';

describe('EyeDashboard', () => {
  let component: EyeDashboard;
  let fixture: ComponentFixture<EyeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyeDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
