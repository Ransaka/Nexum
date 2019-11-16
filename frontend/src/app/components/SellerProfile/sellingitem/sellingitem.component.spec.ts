import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingitemComponent } from './sellingitem.component';

describe('SellingitemComponent', () => {
  let component: SellingitemComponent;
  let fixture: ComponentFixture<SellingitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellingitemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
