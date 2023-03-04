import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Response {
  status: number,
  token: string,
  message: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  public username = '';
  public password = '';
  public confirm_password = '';
  public error = '';

  @Input() formType = '';

  constructor(private http: HttpClient, private router: Router) { }

  public authenticationRequest() {  
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    if(this.formType == 'Sign up' && !this.checkUsername()) {
      this.error = 'Username is incorrect.';
      return;
    }

    if(this.formType == 'Sign up' && this.password.length < 8) {
      this.error = 'Password is too short. (minimum 8 characters)';
      return;
    }

    if (this.formType == 'Sign up' && this.password != this.confirm_password) {
      this.error = 'Passwords do not match.';
      return;
    }

    switch (this.formType) {
      case 'Sign in' : 
        this.http.post('http://127.0.0.1:5000/login', formData).subscribe((response : any) => {
          if(response.token != '') {
            localStorage.setItem('token', response.token);
          }
          this.router.navigateByUrl('/home');
        },
        (error) => {
          if(error.status == 403) {
            this.error = 'Incorrect username or password.';
          }
        }
        );
        break;

      case 'Sign up' :
        this.http.post('http://127.0.0.1:5000/register', formData).subscribe((response : any) => {
          if(response.token != '') {
            localStorage.setItem('token', response.token);
          }
          this.router.navigateByUrl('/home');
        },
        (error) => {
          if(error.status == 409) {
            this.error = 'Username already exists.';
          }
        }
        );
        break;
    }    
  }

  public checkUsername() {
    const alphanumeric = /^[0-9a-zA-Z_]+$/;
    const length = /^.{3,20}$/;
    return alphanumeric.test(this.username) && length.test(this.username);
  }

}