import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndividualRestuarantComponent } from './admin-individual-restuarant.component';

describe('AdminIndividualRestuarantComponent', () => {
  let component: AdminIndividualRestuarantComponent;
  let fixture: ComponentFixture<AdminIndividualRestuarantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIndividualRestuarantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIndividualRestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
