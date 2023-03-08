import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isCreateBulaVisible = false;
  public isTopicsVisible = false;

  public clearToken() {
    localStorage.removeItem('token');
  }

}
