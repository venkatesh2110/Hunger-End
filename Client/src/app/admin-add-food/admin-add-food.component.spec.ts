import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFoodComponent } from './admin-add-food.component';

describe('AdminAddFoodComponent', () => {
  let component: AdminAddFoodComponent;
  let fixture: ComponentFixture<AdminAddFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
