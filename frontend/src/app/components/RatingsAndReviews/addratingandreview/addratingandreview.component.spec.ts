import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddratingandreviewComponent } from './addratingandreview.component';

describe('AddratingandreviewComponent', () => {
  let component: AddratingandreviewComponent;
  let fixture: ComponentFixture<AddratingandreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddratingandreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddratingandreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
