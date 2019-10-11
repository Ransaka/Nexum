import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRegisteredSellerViewComponent } from './non-registered-seller-view.component';

describe('NonRegisteredSellerViewComponent', () => {
  let component: NonRegisteredSellerViewComponent;
  let fixture: ComponentFixture<NonRegisteredSellerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRegisteredSellerViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRegisteredSellerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
