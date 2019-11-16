import { HttpClient, HttpHandler } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastService } from '../../../services/broadcast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BroadcastComponent } from './broadcast.component';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BroadcastComponent', () => {
  let component: BroadcastComponent;
  let fixture: ComponentFixture<BroadcastComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BroadcastComponent, NavbarComponent],
      providers: [FormBuilder, HttpClient, HttpHandler],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA] // Avoid external modeules
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have Broadcast in h3', () => {
  //   expect(de.query(By.css('h3')).nativeElement.innerText).toBe(
  //     'Broadcast Form'
  //   );
  // });
});
