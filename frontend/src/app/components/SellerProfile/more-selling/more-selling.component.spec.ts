import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreSellingComponent } from './more-selling.component';

describe('MoreSellingComponent', () => {
  let component: MoreSellingComponent;
  let fixture: ComponentFixture<MoreSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoreSellingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
