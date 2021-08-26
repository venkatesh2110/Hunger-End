import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestuarantDashboardComponent } from './admin-restuarant-dashboard.component';

describe('AdminRestuarantDashboardComponent', () => {
  let component: AdminRestuarantDashboardComponent;
  let fixture: ComponentFixture<AdminRestuarantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestuarantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestuarantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
