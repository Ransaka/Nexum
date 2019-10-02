import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizingformComponent } from './finalizingform.component';

describe('FinalizingformComponent', () => {
  let component: FinalizingformComponent;
  let fixture: ComponentFixture<FinalizingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
