import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksviewComponent } from './bookmarksview.component';

describe('BookmarksviewComponent', () => {
  let component: BookmarksviewComponent;
  let fixture: ComponentFixture<BookmarksviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
