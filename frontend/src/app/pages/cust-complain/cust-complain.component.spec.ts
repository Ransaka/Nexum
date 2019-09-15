import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustComplainComponent } from './cust-complain.component';

describe('CustComplainComponent', () => {
  let component: CustComplainComponent;
  let fixture: ComponentFixture<CustComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
