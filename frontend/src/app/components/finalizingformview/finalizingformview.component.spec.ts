import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizingformviewComponent } from './finalizingformview.component';

describe('FinalizingformviewComponent', () => {
  let component: FinalizingformviewComponent;
  let fixture: ComponentFixture<FinalizingformviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizingformviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizingformviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
