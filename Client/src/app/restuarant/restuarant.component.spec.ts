import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantComponent } from './restuarant.component';

describe('RestuarantComponent', () => {
  let component: RestuarantComponent;
  let fixture: ComponentFixture<RestuarantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
