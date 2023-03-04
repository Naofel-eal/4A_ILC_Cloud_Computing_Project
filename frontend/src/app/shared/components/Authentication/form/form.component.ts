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

  constructor(private http: HttpClient) { }

  public authenticationRequest() {
    const url = 'http://127.0.0.1:5000/login';
    
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.http.post(url, formData).subscribe(response => {
      console.log(response);
    });
  }

  public checkUsername() {
    if (this.username.length > 15)
      return false;
    return true;
  }

}