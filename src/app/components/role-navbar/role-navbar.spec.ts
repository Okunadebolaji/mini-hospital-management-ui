import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleNavbar } from './role-navbar';

describe('RoleNavbar', () => {
  let component: RoleNavbar;
  let fixture: ComponentFixture<RoleNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
