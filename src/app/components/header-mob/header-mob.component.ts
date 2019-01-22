import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-mob',
  templateUrl: './header-mob.component.html',
  styleUrls: ['./header-mob.component.scss']
})
export class HeaderMobComponent implements OnInit, OnDestroy {

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
