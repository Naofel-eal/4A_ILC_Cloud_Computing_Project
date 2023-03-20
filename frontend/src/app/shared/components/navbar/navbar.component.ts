import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.08s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.08s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class NavbarComponent {

  public isCreateBulaVisible = false;
  public isTopicsVisible = false;

  constructor(private router: Router) {}

  public clearToken() {
    localStorage.removeItem('token');
  }

  public onProfileClick() {
    let userId: string = localStorage.getItem("token")!.split('/')[1];
    this.router.navigate(['/profile', userId]);
  }
}
