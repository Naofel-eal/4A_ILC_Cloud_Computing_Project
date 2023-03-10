import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isCreateBulaVisible = false;
  public isTopicsVisible = false;

  constructor(private router: Router) {}

  public clearToken() {
    localStorage.removeItem('token');
  }

  public onProfileClick() {
    let userId: string = localStorage.getItem("token")!.split('/')[1]
    this.router.navigate(['/profile', userId])
  }
}
