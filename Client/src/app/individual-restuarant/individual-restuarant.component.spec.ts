import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRestuarantComponent } from './individual-restuarant.component';

describe('IndividualRestuarantComponent', () => {
  let component: IndividualRestuarantComponent;
  let fixture: ComponentFixture<IndividualRestuarantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRestuarantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
