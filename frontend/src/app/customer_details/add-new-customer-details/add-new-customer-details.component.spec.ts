import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCustomerDetailsComponent } from './add-new-customer-details.component';

describe('AddNewCustomerDetailsComponent', () => {
  let component: AddNewCustomerDetailsComponent;
  let fixture: ComponentFixture<AddNewCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
