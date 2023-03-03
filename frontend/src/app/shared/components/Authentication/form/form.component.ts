import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  public username = '';
  public password = '';
  public confirm_password = '';

  @Input() formType = '';
}
