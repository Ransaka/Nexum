import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastViewMoreComponent } from './broadcast-view-more.component';

describe('BroadcastViewMoreComponent', () => {
  let component: BroadcastViewMoreComponent;
  let fixture: ComponentFixture<BroadcastViewMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastViewMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
