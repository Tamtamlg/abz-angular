import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'abz-angular';
  authSub: Subscription;

  constructor (
    private authService: AuthService
  ) { }

  ngOnInit () {

    /**
     * Т.к. авторизации нет, а токен нужен, получим его
     */
    this.authSub = this.authService.login().subscribe((response) => {},
    (error) => {});

  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
