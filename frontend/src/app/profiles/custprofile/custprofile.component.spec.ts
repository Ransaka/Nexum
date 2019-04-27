import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustprofileComponent } from './custprofile.component';

describe('CustprofileComponent', () => {
  let component: CustprofileComponent;
  let fixture: ComponentFixture<CustprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
