import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss']
})
export class AboutItemComponent implements OnInit {

  @Input() img: String;
  @Input() title: String;
  @Input() text: String;

  constructor() { }

  ngOnInit() {
  }

}
