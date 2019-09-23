import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerreplyComponent } from './sellerreply.component';

describe('SellerreplyComponent', () => {
  let component: SellerreplyComponent;
  let fixture: ComponentFixture<SellerreplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerreplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
