import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  usersSub: Subscription;
  updateUsersSub: Subscription;
  users = [];
  totalPages = null;
  isBtnShow = true;

  constructor(
    private fetchService: FetchService,
    private registrationService: RegistrationService
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

  updateUsers() {
    this.fetchService.page = 1;
    this.updateUsersSub = this.fetchService.getUsers().subscribe((response) => {
      this.users = response.users;
      this.totalPages = response.total_pages;
      this.fetchService.page += 1;
      if (this.fetchService.page > this.totalPages) {
        this.isBtnShow = false;
      }
    });
  }

  ngOnInit() {
    this.getUsers();
    this.registrationService.events$.forEach(event => {
      if (event === 'updateUsers') {
        this.updateUsers();
      }
    });
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

}
