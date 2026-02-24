import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOnlyLayout } from './navbar-only-layout';

describe('NavbarOnlyLayout', () => {
  let component: NavbarOnlyLayout;
  let fixture: ComponentFixture<NavbarOnlyLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarOnlyLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarOnlyLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
