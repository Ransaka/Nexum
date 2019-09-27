import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerreplyformComponent } from './sellerreplyform.component';

describe('SellerreplyformComponent', () => {
  let component: SellerreplyformComponent;
  let fixture: ComponentFixture<SellerreplyformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerreplyformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerreplyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
