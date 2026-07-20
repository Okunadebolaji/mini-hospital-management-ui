import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseDetail } from './nurse-detail';

describe('NurseDetail', () => {
  let component: NurseDetail;
  let fixture: ComponentFixture<NurseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
