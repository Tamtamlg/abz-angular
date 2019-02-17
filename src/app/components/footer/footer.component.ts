import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  menu = [
    {
      scrollTo: '#acquaintance',
      name: 'About me'
    },
    {
      scrollTo: '#about',
      name: 'Relationships'
    },
    {
      scrollTo: '#requirements',
      name: 'Requirements'
    },
    {
      scrollTo: '#users',
      name: 'Users'
    },
    {
      scrollTo: '#registration',
      name: 'Sign Up'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
