import { Component, OnInit } from '@angular/core';
import { Broadcast } from './../../services/broadcast.dto';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  categories = ['Electronics', 'Vehicles', 'Books'];
}
