import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email="";
  password="";
  message = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' }; 

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
        .then(() => {
          this.message = "You've been succesfully registered!"
        }).catch(err => {
          this.error = err;
          this.router.navigate(['/register']);
        });
    }
  }

  validateForm(email, password){
    if(email.lenght === 0)
    {
      this.errorMessage = "Enter the email.";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = "Enter the password.";
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = "Password is too short";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
