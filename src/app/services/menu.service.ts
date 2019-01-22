import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  showMenu = new BehaviorSubject(false);

  constructor() {
  }
}
