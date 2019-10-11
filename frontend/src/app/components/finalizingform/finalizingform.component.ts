import { BroadcastService } from './../../services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizingform',
  templateUrl: './finalizingform.component.html',
  styleUrls: ['./finalizingform.component.scss']
})
export class FinalizingformComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService
  ) {}

  id: string;
  finalizingForm: FormGroup;
  broadcastData: any;

  ngOnInit() {
    this.finalizingForm = this._formbuilder.group({
      price: ['', Validators.required],
      textMessage: ['']
    });

    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
      } else {
        this.id = '';
      }
    });
    console.log('seller :' + this.id);
    this.getBroadcasts();
  }

  // Get all broadcasts
  getBroadcasts() {
    console.log(this.id);
    this._broadcastService
      .getBroadcastById(this.id)
      .subscribe(data => (this.broadcastData = data));
  }
}
