import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit, OnDestroy {

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

  showMenu: Boolean;
  showMenuSub: Subscription;

  constructor(
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

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.showMenuSub) {
      this.showMenuSub.unsubscribe();
    }
  }

}
