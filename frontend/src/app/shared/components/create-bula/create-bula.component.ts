import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-bula',
  templateUrl: './create-bula.component.html',
  styleUrls: ['./create-bula.component.css']
})
export class CreateBulaComponent {

  public bulaText: string = '';
  private linesLimit: number = 6;

  @Output() closeComponent = new EventEmitter<boolean>();

  public closeComponentCreateBula() {
    this.closeComponent.emit(false);
  }

  public validateText() {
    let lines = this.bulaText.split('\n');
    return lines.length <= this.linesLimit;
  }

  public checkText(event: any) {
    if (event.inputType === "insertLineBreak") {
      this.bulaText = this.bulaText.replace(/\n/g, " ");
    }
  }
}
 