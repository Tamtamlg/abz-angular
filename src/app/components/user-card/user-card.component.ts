import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() userName: string;
  @Input() userPhoto: string;
  @Input() userPosition: string;
  @Input() userEmail: string;
  @Input() userPhone: string;

  constructor() { }

  ngOnInit() {
  }

}
