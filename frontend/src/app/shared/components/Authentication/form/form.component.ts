import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

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

  constructor(private httpClient: HttpClient) { }

  public authenticationRequest() {
    const formData: FormData = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);
    
  }

  public checkUsername() {
    if (this.username.length > 15)
      return false;
    return true;
  }

}