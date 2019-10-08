import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRegisteredComponent } from './non-registered.component';

describe('NonRegisteredComponent', () => {
  let component: NonRegisteredComponent;
  let fixture: ComponentFixture<NonRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRegisteredComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
