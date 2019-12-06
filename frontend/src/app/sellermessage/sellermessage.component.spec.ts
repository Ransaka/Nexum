import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellermessageComponent } from './sellermessage.component';

describe('SellermessageComponent', () => {
  let component: SellermessageComponent;
  let fixture: ComponentFixture<SellermessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellermessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
