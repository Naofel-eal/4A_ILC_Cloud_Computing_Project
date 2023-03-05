import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() onClickBula = new EventEmitter<boolean>();

  public send_create_bula_clicked() {
    this.onClickBula.emit(true);
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

}
