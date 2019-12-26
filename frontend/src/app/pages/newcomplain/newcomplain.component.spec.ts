import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomplainComponent } from './newcomplain.component';

describe('NewcomplainComponent', () => {
  let component: NewcomplainComponent;
  let fixture: ComponentFixture<NewcomplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcomplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcomplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
