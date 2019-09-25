import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastviewComponent } from './broadcastview.component';

describe('BroadcastviewComponent', () => {
  let component: BroadcastviewComponent;
  let fixture: ComponentFixture<BroadcastviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
