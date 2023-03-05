import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-bula',
  templateUrl: './create-bula.component.html',
  styleUrls: ['./create-bula.component.css']
})
export class CreateBulaComponent {

  public bulaText = '';

  @Output() closeComponent = new EventEmitter<boolean>();

  public closeComponentCreateBula() {
    this.closeComponent.emit(false);
  }

}
