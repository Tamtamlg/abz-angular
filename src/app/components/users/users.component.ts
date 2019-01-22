import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  usersSub: Subscription;
  newUsersSub: Subscription;
  users = [];
  totalPages = null;
  isBtnShow = true;

  constructor(
    private fetchService: FetchService
  ) { }

  getUsers() {
    this.usersSub = this.fetchService.getUsers().subscribe((response) => {
      this.users = [...this.users, ...response.users];
      this.totalPages = response.total_pages;
      this.fetchService.page += 1;
      if (this.fetchService.page > this.totalPages) {
        this.isBtnShow = false;
      }
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

}
