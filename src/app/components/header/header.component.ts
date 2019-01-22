import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  showMenu: Boolean;
  showMenuSub: Subscription;

  constructor(
    private menuService: MenuService
    ) {
    this.showMenuSub = this.menuService.showMenu.subscribe(data => {
      this.showMenu = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.showMenuSub) {
      this.showMenuSub.unsubscribe();
    }
  }

}
