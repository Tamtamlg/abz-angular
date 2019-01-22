import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'abz-angular';
  authSub: Subscription;
  showMenu: Boolean;
  showMenuSub: Subscription;

  constructor (
    private authService: AuthService,
    private menuService: MenuService
  ) {
    this.showMenuSub = this.menuService.showMenu.subscribe(data => {
      this.showMenu = data;
    });
  }

  toggleMenu() {
    if (!this.showMenu) {
      this.menuService.showMenu.next(true);
    } else {
      this.menuService.showMenu.next(false);
    }
  }

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
    if (this.showMenuSub) {
      this.showMenuSub.unsubscribe();
    }
  }
}
