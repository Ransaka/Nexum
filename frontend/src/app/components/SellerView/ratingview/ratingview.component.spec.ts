import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingviewComponent } from './ratingview.component';

describe('RatingviewComponent', () => {
  let component: RatingviewComponent;
  let fixture: ComponentFixture<RatingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
