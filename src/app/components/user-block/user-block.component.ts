import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  user: User;

  constructor(
    private fetchService: FetchService
  ) { }

  getActiveUser() {
    this.userSub = this.fetchService.getActiveUser().subscribe((response) => {
      this.user = response.user;
    });
  }

  ngOnInit() {
    this.getActiveUser();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
