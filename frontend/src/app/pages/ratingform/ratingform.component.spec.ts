import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingformComponent } from './ratingform.component';

describe('RatingformComponent', () => {
  let component: RatingformComponent;
  let fixture: ComponentFixture<RatingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
