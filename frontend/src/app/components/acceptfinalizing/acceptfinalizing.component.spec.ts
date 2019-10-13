import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptfinalizingComponent } from './acceptfinalizing.component';

describe('AcceptfinalizingComponent', () => {
  let component: AcceptfinalizingComponent;
  let fixture: ComponentFixture<AcceptfinalizingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptfinalizingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptfinalizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
