import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateFoodComponent } from './admin-update-food.component';

describe('AdminUpdateFoodComponent', () => {
  let component: AdminUpdateFoodComponent;
  let fixture: ComponentFixture<AdminUpdateFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
