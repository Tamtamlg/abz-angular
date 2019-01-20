import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSub: Subscription;
  user = [];

  constructor(
    private fetchService: FetchService
  ) { }

  getActiveUser() {
    this.userSub = this.fetchService.getActiveUser().subscribe((response) => {
      this.user = response.user;
    });
  }

  ngOnInit() {
    // this.getActiveUser();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
