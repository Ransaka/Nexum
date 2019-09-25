import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerviewComponent } from './sellerview.component';

describe('SellerviewComponent', () => {
  let component: SellerviewComponent;
  let fixture: ComponentFixture<SellerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
