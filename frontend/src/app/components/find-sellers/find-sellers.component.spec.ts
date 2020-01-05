import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSellersComponent } from './find-sellers.component';

describe('FindSellersComponent', () => {
  let component: FindSellersComponent;
  let fixture: ComponentFixture<FindSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
