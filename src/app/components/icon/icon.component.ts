import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() iconWidth: string;
  @Input() iconHeight: string;
  @Input() iconName: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
